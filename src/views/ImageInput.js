import React, { useState, useEffect, useRef, Component } from "react";
import { withRouter } from "react-router-dom";
import { loadModels, getFullFaceDescription, createMatcher } from "../api/face";
import "../index.css";
import { BarLoader } from "react-spinners";

// Initial State
const INIT_STATE = {
  imageURL: null,
  fullDesc: null,
  detections: null,
  descriptors: null,
  match: null
};

const ImageInput = () => {
  const [initState, setInitState] = useState({
    ...INIT_STATE,
    faceMatcher: null
  });

  const fileRef = useRef(null);
  const myRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    window.addEventListener("load", resize, false);
    window.addEventListener("resize", resize, false);
  }, []);

  useEffect(() => {
    console.log("useEffect");
    console.log(initState);
    handleImage();
  }, [initState.imageURL]);

  useEffect(() => {
    if (!!initState.detections) {
      printToFile();
    }
  }, [initState.detections]);

  useEffect(async () => {
    await loadModels();
  }, []);

  const handleImage = async (image = initState.imageURL) => {
    console.log("handleImage");
    if (!!image) {
      await getFullFaceDescription(image).then(fullDesc => {
        console.log(fullDesc);
        if (!!fullDesc) {
          console.log(initState);
          const temp = { ...initState };
          temp.descriptors = fullDesc.map(fd => fd.descriptor);
          temp.detections = fullDesc.map(fd => fd.detection);
          setInitState(temp);
          console.log(temp);
        }
      });
    } else {
      console.log("이미지 못 받아옴");
    }
  };

  const handleFileChange = async () => {
    console.log("handleFile");
    // console.log(URL.createObjectURL(fileRef.current.files[0]));
    // resetState();
    await setInitState({
      imageURL: URL.createObjectURL(fileRef.current.files[0]),
      loading: true
    });
  };

  const resetState = () => {
    setInitState({ ...INIT_STATE });
  };
  // 이미지 다운로드 함
  const downloadURI = (uri, name) => {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    link.click();
  };
  // 학습 모델 결과 값을 canvas 에 그린다.
  const printToFile = () => {
    const canvas = myRef.current;
    const ctx = canvas.getContext("2d");
    const img = imageRef.current;

    const { imageURL, detections, match } = initState;

    canvas.width = img.width;
    canvas.height = img.height;

    resize();
    console.log(initState);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.filter = "none";
    ctx.drawImage(img, 0, 0);

    if (!!detections) {
      detections.map((detection, i) => {
        let _H = detection.box.height;
        let _W = detection.box.width;
        let _X = detection.box._x;
        let _Y = detection.box._y;
        var centerX = _X + _W / 2;
        var centerY = _Y + _H / 2;
        ctx.filter = "blur(10px)";
        ctx.beginPath();
        // parameter
        // centerX, centerY, raduis, 0, 타원그릴지);
        ctx.arc(centerX, centerY, _H / 2, 0, 2 * Math.PI);
        ctx.clip();
        ctx.drawImage(img, 0, 0);
      });
    }
    const temp = { ...initState };
    temp.loading = false;
    setInitState(temp);
  };
  // 캔버스 저장해서 다운로드
  const saveCanvas = () => {
    const canvas = myRef.current;
    const dataURL = canvas.toDataURL("image/jpeg");
    downloadURI("data:" + dataURL, "yourImage.jpeg");
  };
  // 동적으로 뷰를 뿌리기 위해서 사용하는 부분
  const resize = () => {
    console.log("resize");
    const canvas = myRef.current;

    var ratio = canvas.width / canvas.height;
    var canvas_height = window.innerHeight;
    var canvas_width = canvas_height * ratio;
    if (canvas_width > window.innerWidth) {
      canvas_width = window.innerWidth;
      canvas_height = canvas_width / ratio;
    }

    canvas.style.width = canvas_width + "px";
    canvas.style.height = canvas_height + "px";
  };
  {
    const { imageURL, detections, match } = initState;

    const titles = ["✨얼굴 블러 처리✨", "✨FACE BLUR YOUR IMAGE✨"];
    const saves = ["⬇️ 블러 처리 이미지 다운로드", "⬇️ Download Blured Image"];
    const uploads = ["🤳 얼굴 이미지 올리기", "🤳 Upload Face Image"];
    const [currentTitle, setCurrentTitle] = useState(
      "✨FACE BLUR YOUR IMAGE✨"
    );
    const [currentSave, setCurrentSave] = useState("⬇️ Download Blured Image");
    const [currentUpload, setCurrentUpload] = useState("🤳 Upload Face Image");
    var index = 0;
    useEffect(() => {
      setInterval(() => {
        if (titles.length > index) {
          setCurrentTitle(titles[index]);
          setCurrentSave(saves[index]);
          setCurrentUpload(uploads[index]);
          index++;
          if (index == titles.length) {
            index = 0;
          }
        }
      }, 2000);
    }, []);

    return (
      <div
        style={{
          backgroundColor: "#1a1a1a",
          height: "100vh",
          width: "100vw",
          margin: -8
        }}
      >
        <div id="titleText">{currentTitle}</div>
        <div className="flexContainer">
          <button className="buttonStyle">
            <label style={{ cursor: "pointer" }}>
              {currentUpload}
              <input
                style={{ display: "none" }}
                ref={fileRef}
                type="file"
                onChange={handleFileChange}
                accept=".jpg, .jpeg, .png"
              />
            </label>
          </button>
          <button className="buttonStyle" onClick={saveCanvas}>
            {currentSave}
          </button>
        </div>
        <div style={{ height: "1rem" }}></div>
        <canvas ref={myRef} />
        <img
          src={imageURL}
          ref={imageRef}
          alt="imageURL"
          style={{
            display: "none"
          }}
        />
        {initState.loading === true ? (
          <div className="flexContainerCenter">
            <div style={{ flex: 1 }}>
              <BarLoader color={"#123abc"} loading={!!initState.loading} />
              <div style={{ height: 20 }} />
              <span>로딩중!_!</span>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
};

export default withRouter(ImageInput);
