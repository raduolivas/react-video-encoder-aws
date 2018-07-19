import React, { Component } from 'react';
import fetchMock from 'fetch-mock';
import Enzymer from 'enzyme';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import jsdom from 'jsdom';
import sinon from 'sinon';

import Videos from './';
import mockVideos from '../../mocks/videos-mock-obj.json';

// test setup with JSDOM
const { window } = new jsdom.JSDOM('<!doctype html><html><body></body></html>');;

global.window = window;
global.document = window.document;
Enzymer.configure({adapter: new Adapter()});

const DELAY_MS = 4000
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
const doc = new jsdom.JSDOM('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;
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
        wrapper = shallow(<Videos />);
    })

    it("always renders a div", () => {
        expect(wrapper.find('div').length).toBeGreaterThan(0);
    });

    it("should call API fetching Videos", () => {
        const responseJson = fetchResponseJson(`https://samba-challenge-api.herokuapp.com/videos`);
        responseJson.then((data) => {

            expect(data).toHaveProperty(`data`, [])
        })
    });

    it(`using promises and check if has mpeg4 format`, () => {
        return fetchResponseJson(`https://samba-challenge-api.herokuapp.com/videos`).then(
            (responseJson) => { expect(responseJson).toHaveProperty(`format`,`mpeg4`) })
    })

    it("on a React component that loads data into state in componentDidMount", () => {
        sinon.spy(Videos.prototype, 'componentDidMount');
        const wrapper = mount(<Videos />);
        expect(Videos.prototype.componentDidMount.calledOnce).to.equal(true);
    })

    it("should have proper props", () => {
        const wrapperMount = mount(<Videos videos="data" />);
        expect(wrapperMount.props().videos).to.equal('data');
    })

})