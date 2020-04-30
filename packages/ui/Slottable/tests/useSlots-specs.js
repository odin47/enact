/* globals console */
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

import React from 'react';
import {mount} from 'enzyme';

import useSlots from '../useSlots';

describe('useSlots', () => {

	test('should distribute children with a \'slot\' property', () => {
		function Component (props) {
			const {a, b, c} = useSlots({slots: ['a', 'b', 'c'], props});

			return (
				<div>
					{c}
					{b}
					{a}
				</div>
			);
		}

		const subject = mount(
			<Component>
				<div slot="a">A</div>
				<div slot="b">B</div>
				<div slot="c">C</div>
			</Component>
		);

		const expected = 'CBA';
		const actual = subject.text();

		expect(actual).toBe(expected);
	});

	test(
		'should distribute children with a \'type\' that matches a slot',
		() => {
			function Component (props) {
				const {a, b, c, custom} = useSlots({slots: ['a', 'b', 'c', 'custom'], props});

				return (
					<div>
						{c}
						{b}
						{a}
						{custom}
					</div>
				);
			}
			const subject = mount(
				<Component>
					<div slot="a">A</div>
					<div slot="b">B</div>
					<custom>D</custom>
					<div slot="c">C</div>
				</Component>
			);

			const expected = 'CBAD';
			const actual = subject.text();

			expect(actual).toBe(expected);
		}
	);

	test(
		'should distribute children whose \'type\' has a \'defaultSlot\' property that matches a slot',
		() => {
			function Custom (props) {
				return <div>{props.children}</div>;
			}
			Custom.defaultSlot = 'c';

			function Component (props) {
				const {a, b, c} = useSlots({slots: ['a', 'b',  'c'], props});

				return (
					<div>
						{c}
						{b}
						{a}
					</div>
				);
			}

			const subject = mount(
				<Component>
					<div slot="a">A</div>
					<div slot="b">B</div>
					<Custom>C</Custom>
				</Component>
			);

			const expected = 'CBA';
			const actual = subject.text();

			expect(actual).toBe(expected);
		}
	);

	test(
		'should distribute children with no \'slot\' property to Slottable\'s \'children\'',
		() => {
			function Component (props) {
				const {a, b, children} = useSlots({slots: ['a', 'b'], props});

				return (
					<div>
						{children}
						{b}
						{a}
					</div>
				);
			}
			const subject = mount(
				<Component>
					<div slot="a">A</div>
					<div slot="b">B</div>
					<div>C</div>
				</Component>
			);

			const expected = 'CBA';
			const actual = subject.text();

			expect(actual).toBe(expected);
		}
	);

	test(
		'should not distribute children with an invalid \'slot\' property',
		() => {
			// Modify the console spy to silence error output with
			// an empty mock implementation
			console.error.mockImplementation();

			function Component (props) {
				const {a, b, c} = useSlots({slots: ['a', 'b'], props});

				return (
					<div>
						{c}
						{b}
						{a}
					</div>
				);
			}

			const subject = mount(
				<Component>
					<div slot="a">A</div>
					<div slot="b">B</div>
					<div slot="c">C</div>
				</Component>
			);

			const expected = 'BA';
			const actual = subject.text();

			expect(actual).toBe(expected);

			// Check to make sure that we only get the one expected error
			const actualErrorsLength = console.error.mock.calls.length;
			const expectedErrorLength = 1;

			expect(actualErrorsLength).toBe(expectedErrorLength);

			const actualError = console.error.mock.calls[0][0];
			const expectedError = 'Warning: The slot "c" specified on div does not exist';

			expect(actualError).toBe(expectedError);
		}
	);

	test(
		'should distribute children with props other than simply \'children\', in entirety, to the matching destination slot',
		() => {
			function Component (props) {
				const {a, b, c, custom} = useSlots({slots: ['a', 'b', 'c', 'custom'], props});
				return (
					<div className="root-div">
						{c}
						{b}
						{a}
						{custom}
					</div>
				);
			}
			const subject = mount(
				<Component>
					<div slot="a" title="Div A" />
					<div slot="b">B</div>
					<custom>D</custom>
					<div slot="c">C</div>
				</Component>
			);

			const expected = 'CBD';
			const actual = subject.text();

			expect(actual).toBe(expected);

			const expectedTitle = 'Div A';
			const actualTitle = subject.find('.root-div').childAt(2).prop('title');
			expect(actualTitle).toBe(expectedTitle);
		}
	);

	test(
		'should distribute multiple children with the same slot into the same slot',
		() => {
			function Component (props) {
				const {a} = useSlots({slots: ['a'], props});
				return (
					<div className="root-div">
						{a}
					</div>
				);
			}
			const subject = mount(
				<Component>
					<div slot="a">A</div>
					<div slot="a">A</div>
					<div slot="a">A</div>
				</Component>
			);

			const expected = 'AAA';
			const actual = subject.text();

			expect(actual).toBe(expected);
		}
	);

	test(
		'should override prop with slot value',
		() => {
			function Component (props) {
				const {a} = useSlots({slots: ['a'], props});
				return (
					<div className="root-div">
						{a}
					</div>
				);
			}
			const subject = mount(
				<Component a="B">
					<div slot="a">A</div>
				</Component>
			);

			const expected = 'A';
			const actual = subject.text();

			expect(actual).toBe(expected);
		}
	);

	test(
		'should fallback to prop when slot is omitted',
		() => {
			function Component (props) {
				const {a} = useSlots({slots: ['a'], props});
				return (
					<div className="root-div">
						{a}
					</div>
				);
			}
			const subject = mount(
				<Component a="B" />
			);

			const expected = 'B';
			const actual = subject.text();

			expect(actual).toBe(expected);
		}
	);
});
