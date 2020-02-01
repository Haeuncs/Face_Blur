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
  const [modelLoad, setModelLoad] = useState(false);
  const [imageOnLoad, setImageOnLoad] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [noneFace, setNoneFace] = useState(false);
  const fileRef = useRef(null);
  const myRef = useRef(null);
  const imageRef = useRef(null);
  // Chrome 1 - 71
  const isChrome =
    !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

  useEffect(() => {
    window.addEventListener("load", resize, false);
    window.addEventListener("resize", resize, false);
  }, []);

  useEffect(() => {
    console.log(initState);
    if (modelLoad) {
      handleImage();
    }
  }, [initState.imageURL]);

  useEffect(() => {
    if (!!initState.detections && imageOnLoad) {
      printToFile();
    }
  }, [initState.detections, imageOnLoad]);

  useEffect(() => {
    async function load() {
      setErrorMsg(
        <span>
          학습 모델을 불러오고 있습니다..🏃‍♀️<br></br>인터넷 환경에 따라 속도가
          다를 수 있습니다.
        </span>
      );
      await loadModels().then(() => {
        console.log("모델 로드 완료");
        setErrorMsg(null);
        setModelLoad(true);

        handleImage();
      });
    }
    if (!!isChrome) {
      load();
    }
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
    }
  };

  const handleFileChange = async () => {
    console.log("handleFile");
    // console.log(URL.createObjec
    if (!!fileRef.current.files[0]) {
      await setInitState({
        imageURL: URL.createObjectURL(fileRef.current.files[0]),
        loading: true
      });
      setImageOnLoad(false);
      setNoneFace(false);
    }
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

    console.log(img.naturalWidth);
    console.log(img.naturalHeight);
    resize();
    console.log(initState);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.filter = "none";

    if (!!detections) {
      if (detections.length > 0) {
        detections.map((detection, i) => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
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
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        });
      } else {
        setNoneFace(true);
      }
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
    var canvas_height = window.innerHeight - 160;
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

    const titles = ["✨얼굴 블러 처리✨", "✨FACE BLUR✨"];
    const saves = ["⬇️ 블러 처리 이미지 다운로드", "⬇️ Download Blured Image"];
    const uploads = ["🤳 얼굴 이미지 올리기", "🤳 Upload Face Image"];
    const [currentTitle, setCurrentTitle] = useState("✨FACE BLUR✨");
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
          if (index === titles.length) {
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
        <div style={{ height: "1rem" }}></div>
        {!!errorMsg ? (
          <div style={{ color: "white", fontSize: "2rem" }}>{errorMsg}</div>
        ) : (
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
        )}
        <div style={{ height: "1rem" }}></div>

        {!isChrome && (
          <div style={{ color: "white" }}>
            블러 처리에 사용하는 canvas 의 filter가 현재 브라우저에서는 제공되지
            않습니다.<br></br>크롬으로 다시 시도해주시겠어요?<br></br>
            The filter of canvas tag used to blur effect is not available in the
            current browser, can you try again with Chrome?
          </div>
        )}
        {!!noneFace && (
          <div style={{ color: "white", fontSize: "2rem" }}>
            🕵️‍♀️ 이미지에서 얼굴을 찾지 못했어요. <br></br>
            🕵️‍♀️ No face on the image.
          </div>
        )}

        <canvas ref={myRef} />
        <img
          src={imageURL}
          ref={imageRef}
          alt="imageURL"
          style={{
            display: "none"
          }}
          onLoad={() => {
            setImageOnLoad(true);
          }}
        />
        {initState.loading === true ? (
          <div className="flexContainerCenter">
            <div style={{ flex: 1 }}>
              <BarLoader color={"white"} loading={!!initState.loading} />
              <div style={{ height: 20 }} />
              <span style={{ color: "white" }}>로딩중 🏃‍♀️</span>
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
