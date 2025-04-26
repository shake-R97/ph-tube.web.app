
function removeActiveClass(){
    const activeBtn = document.getElementsByClassName('active')

    for(let btn of activeBtn){
        btn.classList.remove('active');
    }
}

// show video details

const loadVideoDetails = (videoId) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
  fetch(url)
  .then(res => res.json())
  .then(data => displayVideosDetails(data.video))
}

const displayVideosDetails = (detailsVideo) => {
    document.getElementById('detail_modal').showModal()

    const detailConVid = document.getElementById('details-vid-con');
    detailConVid.innerHTML = `
    
    <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src="${detailsVideo.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">Title</h2>
    <h2 class"font-bold">${detailsVideo.title}</h2>
    <div class="card-actions justify-end">
    </div>
  </div>
</div>
    
    `
}


const loadCategories = () => {

    // fetch Data

    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
}

const displayCategories = (categories) => {
    const createCon = document.getElementById('category-container')

    for (let cat of categories) {

        const createDiv = document.createElement('div');
        createDiv.innerHTML = `
         <button id='btn-${cat.category_id}' onclick="loadCategoryVideo(${cat.category_id})" class="btn btn-sm  hover:bg-red-500 hover:text-white">${cat.category}</button>
        `
        createCon.appendChild(createDiv)
    }
}

// load Video

const loadVideos = (inputSearch  = "") => {

    showLoader()

    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${inputSearch}`)
        .then(res => res.json())
        .then(data =>{
            removeActiveClass()
            displayVideos(data.videos)
            const allBtn = document.getElementById('btn-all')
            allBtn.classList.add('active')
        })
        hideLoader()
}


const displayVideos = (video) => {
     
    showLoader()

    const getVideoCon = document.getElementById('video-con');

    getVideoCon.innerHTML = "";



    if (video.length === 0) {
        getVideoCon.innerHTML = `
             <div class="col-span-4 flex flex-col justify-center items-center py-20">
        <img class="w-28" src="./tube-resource/Icon.png" alt="">

        <h1 class="text-center text-2xl font-bold">No Content Availabel Right Now<br>"Sorry For The Inconvinience!"</h1>
     </div>

            `
        hideLoader()
        return;
    }


    video.forEach((video) => {
        console.log(video)

        const videoDiv = document.createElement('div');
        videoDiv.innerHTML = `
        
             <div class="card bg-base-100 ">
            <figure class="relative">
                <img class="w-full h-[180px] object-cover"  src="${video.thumbnail}" alt="thumbnail" />
                <span class="absolute bottom-2 right-2  text-white bg-black px-2 py-2 text-[10px] rounded-sm">3hrs 56 min ago</span>
            </figure>
            
            <div class=" mt-5 mb-4 flex  gap-3 px-0">
                
                    <div class="avatar w-7 h-7 mt-1 ">
                        <div class="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                          <img  src="${video.authors[0].profile_picture}" />
                        </div>
                      </div>
                
                <div class="">
                <h2 class="card-title text-[15px]">${video.title}</h2>
                
                <p class="text-gray-400 text-sm flex gap-1">${video.authors[0].profile_name} ${video.authors[0].verified === true ? `<img class="w-5" src="./tube-resource/icons8-verified-badge-48.png" alt="">
                ` : ``}  </P>
                <p class="text-gray-400 text-sm">${video.others.views}</p>
                
                
                    
                </div>
                
            </div>
             <button onclick=loadVideoDetails("${video.video_id}") class="btn btn-block">Show Details</button>
        </div>
        
        `

        getVideoCon.appendChild(videoDiv)
        hideLoader()
    })
}

// load categories video

const loadCategoryVideo = (id) => {
    const url = `
        https://openapi.programming-hero.com/api/phero-tube/category/${id}
   `
    fetch(url)
        .then(res => res.json())
        .then(data =>{
            displayVideos(data.category)

            removeActiveClass()
            const clickedbtn = document.getElementById(`btn-${id}`);
            clickedbtn.classList.add("active")
        })
}


document.getElementById('search-input')
.addEventListener('keyup', (inputValue)=> {
  const input = (inputValue.target.value);
  loadVideos(input)
})

const showLoader = () => {
    document.getElementById('loader').classList.remove("hidden");
    document.getElementById('video-con').classList.add('hidden');
}

const hideLoader = () => {
    document.getElementById('loader').classList.add('hidden')
    document.getElementById('video-con').classList.remove('hidden')
}

loadCategories()

