import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import ShallowRenderer from 'react-test-renderer/shallow';
import Adapter from 'enzyme-adapter-react-16';
import { stub } from 'sinon';

import Video from './';

configure({adapter: new Adapter()});

describe('Video ', () => {
    let wrapper;
    let props;

    beforeEach(() => {

        props = {
            video: undefined,
            key: undefined,
            clicked: undefined
        }
        wrapper = shallow(<Video {...props}/>);
    })

    it("always renders a div", () => {
        expect(wrapper.find('div').length).toBeGreaterThan(0);
    });

    it('receive clicked props', () => {
        const render = new ShallowRenderer();
        render.render(<Video clicked={()=>{}} />);
        const tree = render.getRenderOutput();
        expect(typeof wrapper.props().clicked === 'function');
        expect(tree).toMatchSnapshot();
    });

    it('receive video props', () => {
        const render = new ShallowRenderer();
        const tree = render.getRenderOutput();
        expect(tree).toMatchSnapshot();
    });

})