import React, { Component } from 'react';
import fetchMock from 'fetch-mock';
import Enzymer from 'enzyme';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Videos from './';
import mockVideos from '../../mocks/videos-mock-obj.json';

Enzymer.configure({adapter: new Adapter()});

const DELAY_MS = 2000
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const fetchResponseJson = async (url) => {
    try {
        const response = await fetch(url)
        const responseJson = await response.json()
        return responseJson
    }
    catch (e) {
        console.log(`Fetch Videos failed`, e)
    }
}

class video extends Component {
    constructor(props) {
        super(props);
        this.loading = true;
        this.param = null;
        this.state = {videos: {data:[]}};
    }

    render() {
        return(
            <span>{JSON.stringify(this.state.data)}</span>
        )
    }

    componentDidMount() {
        return fetchResponseJson(`https://samba-challenge-api.herokuapp.com/videos`).then((responseJson) => {
            this.setState({
                data: responseJson
            })
        })
    }
}
// const doc = new jsdom.JSDOM('<!doctype html><html><body></body></html>');
// global.document = doc;
// global.window = doc.defaultView;
fetchMock.get(`*`, JSON.stringify(mockVideos));

describe('Videos ', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            videos: {
                data:[{job:{output_media_files:[{format:'mpeg4'}]}}]
            }
        }
    })

    it("always renders a div", () => {
        expect(wrapper.find('div').length).toBeGreaterThan(0);
    });

    it("should call API fetching Videos", () => {
        const responseJson = fetchResponseJson(`https://samba-challenge-api.herokuapp.com/videos`)
        expect(responseJson).not.toHaveProperty(`data`, `job`)
    });

    it(`using promises and check if has mpeg4 format`, () => {
        expect.assertions(1)
        const wrapper = shallow(<Videos />);
        return fetchResponseJson(`https://samba-challenge-api.herokuapp.com/videos`).then(
            (responseJson) => { expect(responseJson).toHaveProperty(`format`,`mpeg4`) })
    })

    it("on a React component that loads data into state in componentDidMount", () => {
       const wrapper = shallow(<Videos />);
       wrapper.instance().componentDidMount();
       sleep(DELAY_MS + 1000);
       expect(wrapper.state(`videos`)).toHaveProperty(`data`, []);
    })
})