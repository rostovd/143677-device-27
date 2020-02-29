if (document.querySelector(".modal")) {
let linkForm = document.querySelector(".write-us-link");
let popupForm = document.querySelector(".modal-write-us");
let closeForm = popupForm.querySelector(".modal-close");
let form = popupForm.querySelector("form");
let userName = popupForm.querySelector("[name=name]");
let userEmail = popupForm.querySelector("[name=email]");
let userText = popupForm.querySelector("[name=text]");
let linkMap = document.querySelector(".contacts-map");
let popupMap = document.querySelector(".modal-map");
let closeMap = popupMap.querySelector(".modal-close");
let isStorageSupport = true;
let storage = {
  name: "",
  email: ""
};

try {
  storage.name = localStorage.getItem("userName");
  storage.email = localStorage.getItem("userEmail");
} catch (err) {
  isStorageSupport = false;
}
if (linkForm) {
  linkForm.addEventListener("click", function (evt) {
    evt.preventDefault();
    popupForm.classList.add("modal-show");
    if (storage.name) {
      userName.value = storage.name;
      if (storage.email) {
        userEmail.value = storage.email;
        userText.focus();
      } else {
        userEmail.focus();
      };
    } else {
      userName.focus();
    }
  });
}
closeForm.addEventListener("click", function (evt) {
  evt.preventDefault();
  popupForm.classList.remove("modal-show");
  popupForm.classList.remove("modal-error");
});

form.addEventListener("submit", function (evt) {
  if (!userName.value || !userEmail.value || !userText.value) {
    evt.preventDefault();
    popupForm.classList.remove("modal-error");
    popupForm.offsetWidth = popupForm.offsetWidth;
    popupForm.classList.add("modal-error");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("userName", userName.value);
      localStorage.setItem("userEmail", userEmail.value);
    }
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (popupForm.classList.contains("modal-show")) {
      popupForm.classList.remove("modal-show");
      popupForm.classList.remove("modal-error");
    }
    if (popupMap.classList.contains("modal-show")) {
      popupMap.classList.remove("modal-show");
    }
  }
});

if (linkMap) {
  linkMap.addEventListener("click", function (evt) {
    evt.preventDefault();
    popupMap.classList.add("modal-show");
  });
}

closeMap.addEventListener("click", function (evt) {
  evt.preventDefault();
  popupMap.classList.remove("modal-show");
});
}
let sliders = document.querySelectorAll(".slider-item");
if (sliders.length !== 0) {
  let slidersNav = document.querySelector(".slider-nav");
  let activeSlider = document.querySelector(".slider-show");
  let sliderLinkWrapper = activeSlider.querySelector(".slider-link-wrapper");
  document.querySelector(".slider-nav").remove;
  sliderLinkWrapper.appendChild(slidersNav);

  slidersNav.addEventListener("click", function (evt) {
    let target = evt.target;
    if (target.classList.contains("slider-checkbox")) {
      document.querySelector(".slider-nav").remove();
      let slideNum = target.id.split('-')[1];
      for (let i = 0; i < sliders.length; i++) {
        sliders[i].classList.remove("slider-show");
      }
      sliders[slideNum - 1].classList.add("slider-show");
      activeSlider = sliders[slideNum - 1];
      sliderLinkWrapper = activeSlider.querySelector(".slider-link-wrapper");
      sliderLinkWrapper.appendChild(slidersNav);
      slidersNav.querySelector("input:checked").focus();
    }
  });
}
let services = document.querySelectorAll(".services-description > div");
if (services.length) {
  let servicesNav = document.querySelector(".services-nav");
  let servicesTab = document.querySelectorAll(".services-tab");

  servicesNav.addEventListener("click", function (evt) {
    evt.preventDefault();
    let target = evt.target;
    if (target.classList.contains("services-link")) {
      let parentLi = target.parentElement;
      for (let i = 0; i < services.length; i++) {
        services[i].classList.remove("service-show");
        servicesTab[i].classList.remove("current");
      }
      let serviceDescriptionSelector = ".services-description-" + target.id.split('-')[0];
      let serviceDescriptionBlock = document.querySelector(serviceDescriptionSelector);
      serviceDescriptionBlock.classList.add("service-show");
      parentLi.classList.add("current");
    }
  });
}
let line = document.querySelector(".price-controls");
if (line) {
  let bar = document.querySelector(".bar");
  let minPrice = document.querySelector("input[name='min-price']");
  let maxPrice = document.querySelector("input[name='max-price']");
  let point1 = document.querySelector(".range-toggle-min");
  let point2 = document.querySelector(".range-toggle-max");
  let coordsLine = line.getBoundingClientRect();
  let maxPriceValue = 9000;
  let pixelPriceValue = maxPriceValue / line.clientWidth;
  let downTarget = "";
  let mouseDown = function (evtDown) {
    downTarget = evtDown.target;
    let shiftX = evtDown.clientX - downTarget.getBoundingClientRect().left;
    let mouseMove = function (evtMove) {
      minPrice.style.pointerEvents = "none";
      maxPrice.style.pointerEvents = "none";
      let coordsPoint1 = point1.getBoundingClientRect();
      let coordsPoint2 = point2.getBoundingClientRect();
      let minPoint1X = coordsLine.left - coordsPoint1.width / 2;
      let minPoint1Left = minPoint1X - coordsLine.left;
      let maxPoint1X = coordsPoint2.left - coordsPoint1.width;
      let minPoint2X = coordsPoint1.left + coordsPoint1.width;
      let minPoint2Left = minPoint2X - coordsLine.left;
      let maxPoint2X = coordsLine.right - coordsPoint2.width / 2;
      let cursorX = evtMove.clientX - shiftX;
      let movePoint = function (minX, minLeft, maxX, point) {
        if (cursorX >= minX && cursorX <= maxX) {
          downTarget.style.left = cursorX - coordsLine.left + "px";
        }
        if (cursorX < minX) {
          downTarget.style.left = minLeft + "px";
        }
        if (cursorX > maxX) {
          downTarget.style.left = maxX - coordsLine.left - 2 + "px";
        }
        bar.style.left = point1.offsetLeft + coordsPoint1.width / 2 + "px";
        bar.style.width = point2.offsetLeft - point1.offsetLeft + "px";
      }
      if (downTarget.classList.contains("range-toggle-min")) {
        movePoint(minPoint1X, minPoint1Left, maxPoint1X, point1);
      }
      if (downTarget.classList.contains("range-toggle-max")) {
        movePoint(minPoint2X, minPoint2Left, maxPoint2X, point2);
      }
      minPrice.value = (point1.offsetLeft - minPoint1Left) * pixelPriceValue;
      maxPrice.value = (point2.offsetLeft + point2.offsetWidth / 2) * pixelPriceValue;
    }
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", function () {
      downTarget = "";
      document.removeEventListener("mousemove", mouseMove);
      minPrice.style.pointerEvents = "auto";
      maxPrice.style.pointerEvents = "auto";
    });
  }
  line.addEventListener("mousedown", mouseDown);
  line.ondragstart = function () {
    return false;
  };
}