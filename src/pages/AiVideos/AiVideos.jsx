import React from "react";
import ImageUploadBox from "../../components/ImageUploadBox/ImageUploadBox";
import uploadIcon from "../../assets/uploadIcon.png";

function AiVideos() {
  return (
    <div>
      <ImageUploadBox
        width="600px"
        height="350px"
        uploadBoxWidth="520px"
        uploadBoxHeight="300px"
        icon={uploadIcon}
        title="이미지 업로드"
        supportText="Support JPG/PNG Files"
      />
    </div>
  );
}

export default AiVideos;
