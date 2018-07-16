import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import ShallowRenderer from 'react-test-renderer/shallow';
import Adapter from 'enzyme-adapter-react-16';
import { stub } from 'sinon';

import Upload from './';

configure({adapter: new Adapter()});

describe('Upload ', () => {
    let wrapper;
    let props;

    beforeEach(() => {
        props = {
            uploadEvent: undefined,
            uploadStart: undefined
        }
        wrapper = shallow(<Upload {...props}/>);
    })

    it("always renders a div", () => {
        expect(wrapper.find('div').length).toBeGreaterThan(0);
    });

    it('should render an <Upload /> form component', () => {
        expect(wrapper.find('form')).toHaveLength(1);
    });

    it('receive uploadStart props', () => {
        const render = new ShallowRenderer();
        render.render(<Upload uploadStart={()=>{}} />);
        const tree = render.getRenderOutput();
        expect(typeof wrapper.props().uploadStart === 'function');
        expect(tree).toMatchSnapshot();
    });

    it('receive uploadEvent props', () => {
        const render = new ShallowRenderer();
        render.render(<Upload uploadEvent={()=>{}} />);
        const tree = render.getRenderOutput();
        expect(typeof wrapper.props().uploadEvent === 'function');
        expect(tree).toMatchSnapshot();
    });

    it('renders a file input', () => {
        expect(wrapper.find('#file').length).toEqual(1)
    })
})