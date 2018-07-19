import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import ShallowRenderer from 'react-test-renderer/shallow';
import Adapter from 'enzyme-adapter-react-16';
import { stub } from 'sinon';

import UploadSent from './';

configure({adapter: new Adapter()});

describe('UploadSent ', () => {
    let wrapper;
    let props;

    beforeEach(() => {
        props = {
            sendAnotherFile: undefined,
            data: undefined
        }
        wrapper = shallow(<UploadSent {...props}/>);
    })

    it("always renders a div", () => {
        expect(wrapper.find('div').length).toBeGreaterThan(0);
    });

    it('receive sendAnotherFile props', () => {
        const render = new ShallowRenderer();
        render.render(<UploadSent cancel={()=>{}} />);
        const tree = render.getRenderOutput();
        expect(typeof wrapper.props().sendAnotherFile === 'function');
        expect(tree).toMatchSnapshot();
    });

    it('receive data props', () => {
        const render = new ShallowRenderer();
        const data = {};
        render.render(<UploadSent event={data} />);
        const tree = render.getRenderOutput();
        expect(tree).toMatchSnapshot();
    });

})