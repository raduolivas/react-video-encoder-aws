import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { stub } from 'sinon';

import VideoPlayer from './';

configure({adapter: new Adapter()});

describe('VideoPlayer ', () => {
    let wrapper;
    let props;

    beforeEach(() => {
        props = {
            video: undefined,
            isLoaded: undefined
        }
        wrapper = shallow(<VideoPlayer {...props}/>);
    })

    it("always renders a div", () => {
        expect(wrapper.find('div').length).toBeGreaterThan(0);
    });

    it('<VideoPlayer /> should exist', () => {
        expect(wrapper.find(Video).exists()).to.equal(true);
    });

})