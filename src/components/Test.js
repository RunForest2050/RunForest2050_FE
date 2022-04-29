import React, { useEffect, useState } from "react";
import { CardGrid, Image } from "../elements";
import { BiX } from "react-icons/bi";
import styled from "styled-components";
import { HiUpload } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { imgActions } from "../redux/modules/image";

const Upload = (image) => {
  const eddit = image.image;
  const dispatch = useDispatch();
  const [imgPreview, setImgPreview] = useState([]);
  const [isUrl, setUrl] = useState([]);

  const uploadFile = (e) => {
    const imageList = e.target.files;
    let imageUrlList = [...imgPreview];

    for (let i = 0; i < imageList.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageList[i]);
      imageUrlList.push(currentImageUrl);
    }

    if (imageUrlList.length > 10) {
      imageUrlList = imageUrlList.slice(0, 10);
    }
    setImgPreview(imageUrlList);

    let imgList = [];

    for (const key in imageList) {
      if (Object.hasOwnProperty.call(imageList, key)) {
        imgList.push(imageList[key]);
      }
    }

    dispatch(imgActions.setPre(imgList));
  };

  // useEffect(() => {
  //   let editPree = [];
  //   for (let i = 0; i < eddit.length; i++) {
  //     editPree.push(eddit[i]);
  //   }
  //   setImgPreview(editPree);
  //   setUrl(editPree);
  //   dispatch(imgActions.setPre(editPree));
  // }, [eddit]);

  const handleDeleteImage = (x, id) => {
    if (x.indexOf("hyemco-butket") !== -1) {
      dispatch(imgActions.editUrl(x));
      dispatch(imgActions.deletePre(id));
    } else {
      dispatch(imgActions.deletePre(id));
    }

    setImgPreview(imgPreview.filter((b, idx) => idx !== id));
  };

  return (
    <>
      <CardGrid is_flex width="auto">
        <Labels htmlFor="files" onChange={uploadFile}>
          <HiUpload />
          <Inputs type="file" id="files" multiple="multiple" />
        </Labels>
        {imgPreview.map((image, id) => {
          return (
            <CardGrid key={id} margin="0px 25px 25px 0">
              <BiX
                type="button"
                onClick={() => {
                  handleDeleteImage(image, id);
                }}
              />
              <ImageList src={`${image}`} alt={`${image}-${id}`} />
            </CardGrid>
          );
        })}
        <Labels htmlFor="files">
          <HiUpload />
          <Inputs
            type="file"
            id="files"
            // multiple="multiple"
            accept="video/*,.pdf"
          />
        </Labels>
      </CardGrid>
    </>
  );
};

export default Upload;

const Labels = styled.label`
  display: block;
  text-align: center;
  align-items: center;
  justify-content: center;
  line-height: 100px;
  font-size: 18px;
  width: 150px;
  height: 100px;
  margin: 0 25px 0 25px;
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: 3px;
`;

const Inputs = styled.input`
  display: none;
`;

const ImageList = styled.div`
  width: 150px;
  height: 100px;
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: 3px;
  background-image: url("${(props) => props.src}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
`;
