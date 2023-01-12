import React, { useContext } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ItemContext from '../Context/ItemContext';

function Descriptions() {
  const item = useContext(ItemContext);
  const Description = useContext(ItemContext).ItemInfo.Description;
  const setDescription = useContext(ItemContext).ItemMethods.setDescription;
  const readOnly = item.Search.readOnly;

 var modules = {
    toolbar: [
      [{ 'header': [1, 2, 3,4,5,6, false] },{'font': []}],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ]
  }

  var formats = [
    'header', 'font',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  return <>
    <ReactQuill theme="snow" readOnly={readOnly}  placeholder='Optional' value={Description} onChange={setDescription} formats={formats} modules={modules} />
  </>
}

export default Descriptions;