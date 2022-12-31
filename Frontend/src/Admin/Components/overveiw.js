import React, { useState, useContext } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ItemContext from '../Context/ItemContext';

function OverVeiws() { 
  const ItemDescription = useContext(ItemContext).ItemInfo.ItemDescrip;
  const setItemDescription = useContext(ItemContext).ItemMethods.setItemDescription;

 var modules = {
    toolbar: [
      [{ 'header': [1, 2,3,4,5,6, false] },{'font': []}],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ]
  }

  var formats = [
    'header','font',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  return <>
    <ReactQuill theme="snow" placeholder='Optional' value={ItemDescription} onChange={setItemDescription} formats={formats} modules={modules} />
  </>
}

export default OverVeiws;