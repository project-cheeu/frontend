import React from 'react';
import ReactQuill from 'react-quill';

const TextEditor = ({ value, setValue, length, line }) => {
  /* Router */
  /* State */
  /* Hooks */
  const reactQuillRef = React.useRef();

  /* Functions */
  const handleChange = (val) => setValue(val);

  const checkCharacterCount = (event) => {
    const unprivilegedEditor = reactQuillRef.current;
    if (unprivilegedEditor.getLength() > length && event.key !== 'Backspace')
      event.preventDefault();
  };
  /* Render */
  return (
    <ReactQuill
      theme="snow"
      onKeyDown={checkCharacterCount}
      ref={reactQuillRef}
      value={value}
      onChange={handleChange}
    />
  );
};

TextEditor.defaultProps = {
  length: 250,
};

export default TextEditor;
