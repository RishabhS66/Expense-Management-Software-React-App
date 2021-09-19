# React Bootstrap Floating Label

![version](https://img.shields.io/npm/v/react-bootstrap-floating-label?style=for-the-badge)
![updated](https://img.shields.io/github/last-commit/brennanwilkes/react-bootstrap-floating-label?style=for-the-badge)
![size](https://img.shields.io/bundlephobia/minzip/react-bootstrap-floating-label?style=for-the-badge)
![react](https://img.shields.io/github/package-json/dependency-version/brennanwilkes/react-bootstrap-floating-label/dev/react?color=black&style=for-the-badge)

![license](https://img.shields.io/github/license/brennanwilkes/react-bootstrap-floating-label?style=for-the-badge)
![issues](https://img.shields.io/github/issues/brennanwilkes/react-bootstrap-floating-label?style=for-the-badge)
![contributors](https://img.shields.io/github/contributors/brennanwilkes/react-bootstrap-floating-label?style=for-the-badge)
![downloads](https://img.shields.io/npm/dt/react-bootstrap-floating-label?style=for-the-badge)

A handy form input element with a floating label for react, styled to fit bootstrap projects  
*note* This package does **not** require bootstrap, instead it has default "bootstrap-like" stylings which allow it to fit in nicely with bootstrap projects.

**Installation**

With npm:
```sh
npm install react-bootstrap-floating-label react
```

With a CDN:
```html
<script src="https://unpkg.com/react-bootstrap-floating-label"></script>
```

**Example usage**
```js
import FloatingLabel from "react-bootstrap-floating-label";

<FloatingLabel />
<FloatingLabel label="Name: " />
<FloatingLabel label="Name: " id="myLabel" style={{width: "40%"}} onChange={event => console.log(event.target.value) } />
```

**Props**

<FloatingLabel /> can be used completely without props, however you will likely want to pass in some props in order to customize it to your needs.

| Prop           | Type       | Purpose                                                                               |
| -------------- | ---------- | ------------------------------------------------------------------------------------- |
| id             | `string`   | ID of the wrapper div                                                                 |
| labelId        | `string`   | ID of the internal label element                                                      |
| inputId        | `string`   | ID of the internal input element                                                      |
| onChange       | `function` | Callback function to run on change. Accepts parameter `event`                         |
| onChangeDelay  | `number`   | Number of milliseconds to delay onChange callback by. Will reset on new change events |
| onBlur         | `function` | Callback function to run on blur. Accepts parameter `event`                           |
| onFocus        | `function` | Callback function to run on focus. Accepts parameter `event`                          |
| className      | `string`   | Class(es) to apply to the wrapper div                                                 |
| labelClassName | `string`   | Class(es) to apply to the internal label element                                      |
| inputClassName | `string`   | Class(es) to apply to the internal input element                                      |
| type           | `string`   | HTML5 input type. Defaults to text                                                    |
| label          | `string`   | Label text to display inside input                                                    |
| style          | `object`   | React type styles to apply to the wrapper div                                         |
| labelStyle     | `object`   | React type styles to apply to the internal label element                              |
| inputStyle     | `object`   | React type styles to apply to the internal input element                              |
