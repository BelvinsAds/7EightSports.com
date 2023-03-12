import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getFirestore, doc, getDoc, getDocs, collection, setDoc, addDoc, where, query } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js"
const firebaseConfig = {
  apiKey: "AIzaSyCI4YKWsLjK0EQsEqwDS168sRBSLOXdjA4",
  authDomain: "fir-bl-d924d.firebaseapp.com",
  projectId: "fir-bl-d924d",
  storageBucket: "fir-bl-d924d.appspot.com",
  messagingSenderId: "137235172497",
  appId: "1:137235172497:web:869e5ba6dfdc1db3fec330",
  measurementId: "G-5H219SF60E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
//Initialize Cloud Storgae
const storage = getStorage(app);


//Create Player Information
var addpl = document.querySelector(".plive");
const playerlist = collection(db, "Player");
//Blog Input Information
var addblog = document.querySelector(".livelive");
const blogscollection = collection(db, "blogs");
const gallerycollection = collection(db, "GalleryLinks");

//Image Information


var files = []
var reader = new FileReader();
var urlheight;

var namebox = document.getElementById('namebox');
var linkbox = document.getElementById('linkbox')
var extlab = document.getElementById('extlab');
var blogimg = document.getElementById('blogimg')
var myimg = document.getElementById('myimg');
var myimg1 = document.getElementById('myimg1');
var myimg2 = document.getElementById('myimg2');
var SelBtn = document.getElementById('Test');
var SelBtnp = document.getElementById('Test1');
var SelBtng = document.getElementById('Test2');
var proglab = document.getElementById('upprogress');
var UpBtn = document.getElementById('BlogLive');
var UpBtn2 = document.getElementById('playercreate');
var UpBtn3 = document.getElementById('Gallerylive');
var DownBtn = document.getElementById('downbtn');
var input = document.createElement('input');
input.type = 'file';

input.onchange = e => {
  files = e.target.files;

  var extention = GetFileExt(files[0]);
  var name = GetFileName(files[0]);

  namebox.value = name;
  extlab.innerHTML = extention;
  

  reader.readAsDataURL(files[0]);
}

reader.onload = function () {
  myimg.src = reader.result;
}

reader.onload = function () {
  myimg1.src = reader.result;
}

reader.onload = function () {
  myimg2.src = reader.result;
}

SelBtn.onclick = function () {
  input.click();
}

SelBtnp.onclick = function () {
  input.click();
}

SelBtng.onclick = function () {
  input.click();
}

function GetFileExt(file) {
  var temp = file.name.split('.');
  var ext = temp.slice((temp.length - 1), (temp.length));
  return '.' + ext[0];
}

function GetLinkURL(file){
  urlheight = file
  return urlheight;
}

function GetFileName(file) {
  var temp = file.name.split('.');
  var fname = temp.slice(0, -1).join('.');
  return fname;
}

async function UploadProcess() {
  var ImgToUpload = files[0];

  var ImgName = namebox.value + extlab.innerHTML;

  const metaData = {
    contentType: ImgToUpload.type
  }
  const storageRef = sRef(storage, 'Blog/' + ImgName);

  const UploadTask = uploadBytesResumable(storageRef, ImgToUpload, metaData);

  UploadTask.on('state-changed', (snapshot) => {
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    proglab.innerHTML = "Upload " + progress + "%";
  },
    (error) => {
      alert("Error: Image Not Uploaded " + error);
    },

    () => {
      getDownloadURL(UploadTask.snapshot.ref).then((downloadURL) => {
        var link = GetLinkURL(downloadURL);
        linkbox.innerHTML = link;
        console.log(linkbox.innerHTML);
        addDoc(blogscollection, {
          Author: addblog.BLOG_AUTHOR.value,
          Title: addblog.BLOG_TITLE.value,
          Content: addblog.BLOG_CONTENT.value,
          Quote: addblog.BLOG_QUOTE.value,
          ImageName: (namebox.value + extlab.innerHTML),
          ImageURL: linkbox.innerHTML,
        });
        alert("Blog Created");
      });
    }
  );
}

async function PLUploadProcess() {
  var ImgToUpload = files[0];

  var ImgName = namebox.value + extlab.innerHTML;

  const metaData = {
    contentType: ImgToUpload.type
  }
  const storageRef = sRef(storage, 'Player/' + ImgName);

  const UploadTask = uploadBytesResumable(storageRef, ImgToUpload, metaData);

  UploadTask.on('state-changed', (snapshot) => {
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    proglab.innerHTML = "Upload " + progress + "%";
  },
    (error) => {
      alert("Error: Image Not Uploaded " + error);
    },

    () => {
      getDownloadURL(UploadTask.snapshot.ref).then((downloadURL) => {
        var link = GetLinkURL(downloadURL);
        linkbox.innerHTML = link;
        addDoc(playerlist, {
          FirstName: addpl.PLAYER_FIRST_NAME.value,
          LastName: addpl.PLAYER_LAST_NAME.value,
          DOB: addpl.PLAYER_DOB.value,
          POB: addpl.PLAYER_POB.value,
          PlayerNumber: addpl.PLAYER_NUMBER.value,
          Sport: addpl.PLAYER_SPORTS.value,
          Position: addpl.PLAYER_POSITION.value,
          ImageName: (namebox.value + extlab.innerHTML),
          ImageURL: linkbox.innerHTML,
        });
        alert("Player Created");
      });
    }
  );
}

async function GUploadProcess() {
  var ImgToUpload = files[0];

  var ImgName = namebox.value + extlab.innerHTML;

  const metaData = {
    contentType: ImgToUpload.type
  }
  const storageRef = sRef(storage, 'Gallery/' + ImgName);

  const UploadTask = uploadBytesResumable(storageRef, ImgToUpload, metaData);

  UploadTask.on('state-changed', (snapshot) => {
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    proglab.innerHTML = "Upload " + progress + "%";
  },
    (error) => {
      alert("Error: Image Not Uploaded " + error);
    },

    () => {
      getDownloadURL(UploadTask.snapshot.ref).then((downloadURL) => {
        SaveURLtoFireStore(url);
      });
    }
  );
}


async function SaveURLtoFireStore(url) {
  var name = namebox.value;
  var ext = extlab.innerHTML;

  var ref = doc(db, "GalleryLinks/" + name);

  await setDoc(ref, {
    ImageName: (name + ext),
    ImageURL: url,
  })
}




async function GetImagefromFireStore() {
  var name = namebox.value;

  var ref = doc(db, "ImageLinks/" + name);

  const docSnap = await getDoc(ref);

  if (docSnap.exists()) {
    myimg.src = docSnap.data().ImageURL;
    console.log('Image Should Be There');
  } else {
    alert('Image Does Not Exists');
  }
}
//Adding Images With Topic
UpBtn.onclick = UploadProcess;
UpBtn2.onclick = PLUploadProcess;
UpBtn3.onclick = GUploadProcess;

//Getting Images With Topics
DownBtn.onclick = GetImagefromFireStore;

/*/Adding Player
playercreate.addEventListener("click", (e) => {
  addDoc(playerlist, {
    FirstName: addpl.PLAYER_FIRST_NAME.value,
    LastName: addpl.PLAYER_LAST_NAME.value,
    DOB: addpl.PLAYER_DOB.value,
    POB: addpl.PLAYER_POB.value,
    PlayerNumber: addpl.PLAYER_NUMBER.value,
    Sport: addpl.PLAYER_SPORTS.value,
    Position: addpl.PLAYER_POSITION.value,
    ImageName: (namebox.value + extlab.innerHTML),
    ImageURL: linkbox.innerHTML,
  });
  alert("Player Created");
});

//Creating/Live Post Blog
/*
BlogLive.addEventListener("click", (e) => {
  console.log(linkbox.innerHTML);
  addDoc(blogscollection, {
    Author: addblog.BLOG_AUTHOR.value,
    Title: addblog.BLOG_TITLE.value,
    Content: addblog.BLOG_CONTENT.value,
    Quote: addblog.BLOG_QUOTE.value,
    ImageName: (namebox.value + extlab.innerHTML),
    ImageURL: linkbox.innerHTML,
  });
  alert("Blog Created");
});
*/
//Getting Documents
getDocs(blogscollection).then((snapshot) => {
  const blogs = [];
  snapshot.docs.forEach((doc) => {
    let data = doc.data();
    blogs.push({ ...doc.data(), id: doc.id });
    //Main Section Top Big Text
    
    let blog = `
        <li class="col-md-4 lol" id="read">
            <div class="ec-blog-wrap">
            <figure>
            <a href="#"><img src="${data.ImageURL}"></a> <span class="ec-featured-star ec-bgcolor"><i class="fa fa-star"></i></span></figure>
            <div class="ec-blog-text">
            <h2><a href="#" >${data.Title}</a></h2>
            <div class="ec-grid-time">
            <span>By - ${data.Author}</span>
            <a href="#" class="fa fa-angle-right"></a>
            </div>
            </div>
            </div>
        </li>
        `;
    let conblog = document.getElementById("blog");
    conblog.innerHTML += blog;

    //Small Section Footer
    let blog1 = `
        <li data-name="${doc.id}" id="read">
            <figure>
                <a href="#"><img src="${data.ImageURL}" alt=""></a>
            </figure>
            <section>
                <h6 style="color: white;"><a href="#" style="color: white;">${data.Title}</a></h6>
                <span style="color: #999999;">By - ${data.Author}</span>
            </section>
        </li>
        `;
    let conblog1 = document.getElementById("blog1");
    conblog1.innerHTML += blog1;
    let blogown = `
    <div class="row">
                        <div class="col-md-9">
                            <div class="ec-fancy-title">
                                <h2>${data.Title}</h2>
                            </div>
                            
                            <div class="ec-fancy-title">
                                <h2>${data.Author}</h2>
                            </div>
                            <div class="ec-detail-editor ec-plyer-information-wrap">
                                <p>${data.Content}</p>
                                <blockquote>${data.Qoute}</blockquote>
                                <p>${data.Content}
                                </p>
                                <div class="ec-tags">
                                    <span><i class="fa fa-tags"></i> Tags</span>
                                    <a href="#">${data.Author}</a>
                                    <a href="#">Sports</a>
                                    <a href="#">${doc.id}</a>
                                    <a href="#">7 Eight Sports</a>
                                </div>
                            </div>

    
    `;
    let conblogown = document.getElementById("reablog");
    conblogown.innerHTML += blogown;

  });
  
});

//Getting One Blog Page

rblog.addEventListener('click', (e) => {
  //Main Section Top Big Text
  getDocs(blogscollection).then((snapshot) => {
    let blogs = [];
    snapshot.docs.forEach((doc) => {
      let data = doc.data();
      blogs.push({ ...doc.data(), id: doc.id });
      //Main Section Top Big Text
      
      const url = "/blog.html?";
      const obj = `${doc.id}`;
      const searchParams = new URLSearchParams(obj);
      const queryString = searchParams.toString();
      window.location.href = url + queryString;
    });
  });
})

rblog1.addEventListener('click', (e) => {
  getDocs(blogscollection).then((snapshot) => {
    let blogs = [];
    snapshot.docs.forEach((doc) => {
      let data = doc.data();
      blogs.push({ ...doc.data(), id: doc.id });
      //Main Section Top Big Text
      
      const url = "/blog.html?";
      const obj = `${doc.id}`;
      const searchParams = new URLSearchParams(obj);
      const queryString = searchParams.toString();
      window.location.href = url + queryString;
    });
  });
})

getDocs(gallerycollection).then((snapshot) => {
  let galleries = [];
  snapshot.docs.forEach((doc) => {
    let data = doc.data();
    galleries.push({ ...doc.data(), id: data.ImageURL });
    let gallery = `
    <li class="col-md-3">
    <figure>
        <a href="#"><img src="${data.ImageURL}" alt=""></a>
        <figcaption>
            <a title="" rel="${data.ImageURL}" href="${data.ImageURL}"
                class="ec-color"><i class="fa fa-compress"></i></a>
        </figcaption>
    </figure>
    </li>
    `;
    let showgall = document.getElementById("galler");
    showgall.innerHTML += gallery;
  });
});


// Getting Player By Each Category
getDocs(playerlist).then((snapshot) => {
  let players = [];
  let playersfb = [];
  let playersbb = [];
  let playersss = [];
  let playersbk = [];
  let playersh = [];
  snapshot.docs.forEach((doc) => {
    let data = doc.data();
    if (`${data.Sport}` == "Football" || `${data.Sport}` == "football") {
      playersfb.push({ ...doc.data(), id: doc.id });
      let playerfb = `
            <li class="col-md-3">
                <div class="ec-team-wrap-lead">
                <figure>
                    <a href="#"><img src="${data.ImageURL}" alt=""></a>
                </figure>
                <div class="ec-team-info">
                    <div class="ec-forinfo">
                    <h3><a href="#">${data.FirstName} ${data.LastName}</a></h3>
                    <small>${data.Sport}</small>
                </div>
                <span class="ec-goal-counter ec-bgcolor">${data.PlayerNumber}</span>
                <span class="ec-plyer-info">${data.DOB}<br> ${data.Position}</span>
                </div>
                </div>
            </li>
            `;
      let conplayer = document.getElementById("Football");
      conplayer.innerHTML += playerfb;
    }
    if (`${data.Sport}` == "Baseball" || `${data.Sport}` == "baseball") {
      playersbb.push({ ...doc.data(), id: doc.id });
      let playerbb = `
            <li class="col-md-3">
                <div class="ec-team-wrap-lead">
                <figure>
                    <a href="#"><img src="${data.ImageURL}" alt=""></a>
                </figure>
                <div class="ec-team-info">
                    <div class="ec-forinfo">
                    <h3><a href="#">${data.FirstName} ${data.LastName}</a></h3>
                    <small>${data.Sport}</small>
                </div>
                <span class="ec-goal-counter ec-bgcolor">${data.PlayerNumber}</span>
                <span class="ec-plyer-info">${data.DOB}<br> ${data.Position}</span>
                </div>
                </div>
            </li>
            `;
      let conplayer = document.getElementById("Baseball");
      conplayer.innerHTML += playerbb;
    }
    if (`${data.Sport}` == "Soccer" || `${data.Sport}` == "soccer") {
      playersss.push({ ...doc.data(), id: doc.id });
      let playerss = `
            <li class="col-md-3">
                <div class="ec-team-wrap-lead">
                <figure>
                    <a href="#"><img src="${data.ImageURL}" alt=""></a>
                </figure>
                <div class="ec-team-info">
                    <div class="ec-forinfo">
                    <h3><a href="#">${data.FirstName} ${data.LastName}</a></h3>
                    <small>${data.Sport}</small>
                </div>
                <span class="ec-goal-counter ec-bgcolor">${data.PlayerNumber}</span>
                <span class="ec-plyer-info">${data.DOB}<br> ${data.Position}</span>
                </div>
                </div>
            </li>
            `;
      let conplayer = document.getElementById("Soccer");
      conplayer.innerHTML += playerss;
    }
    if (`${data.Sport}` == "Hockey" || `${data.Sport}` == "hockey") {
      playersh.push({ ...doc.data(), id: doc.id });
      let playerh = `
              <li class="col-md-3">
                  <div class="ec-team-wrap-lead">
                  <figure>
                      <a href="#"><img src="${data.ImageURL}" alt=""></a>
                  </figure>
                  <div class="ec-team-info">
                      <div class="ec-forinfo">
                      <h3><a href="#">${data.FirstName} ${data.LastName}</a></h3>
                      <small>${data.Sport}</small>
                  </div>
                  <span class="ec-goal-counter ec-bgcolor">${data.PlayerNumber}</span>
                  <span class="ec-plyer-info">${data.DOB}<br> ${data.Position}</span>
                  </div>
                  </div>
              </li>
              `;
      let conplayer = document.getElementById("Hockey");
      conplayer.innerHTML += playerh;
    }
    if (`${data.Sport}` == "Basketball" || `${data.Sport}` == "basketball") {
      playersbk.push({ ...doc.data(), id: doc.id });
      let playerbk = `
            <li class="col-md-3">
                <div class="ec-team-wrap-lead">
                <figure>
                    <a href="#"><img src="${data.ImageURL}" alt=""></a>
                </figure>
                <div class="ec-team-info">
                    <div class="ec-forinfo">
                    <h3><a href="#">${data.FirstName} ${data.LastName}</a></h3>
                    <small>${data.Sport}</small>
                </div>
                <span class="ec-goal-counter ec-bgcolor">${data.PlayerNumber}</span>
                <span class="ec-plyer-info">${data.DOB}<br> ${data.Position}</span>
                </div>
                </div>
            </li>
            `;
      let conplayer = document.getElementById("BasketBall");
      conplayer.innerHTML += playerbk;
    } else {
      players.push({ ...doc.data() });
    }
  });
 
});

//Roster Section
