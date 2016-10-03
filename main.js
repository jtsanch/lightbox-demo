var
    page,
    pageCount,
    currentIndex,
    api,
    loadingIcon,
    itemCount = 0,
    photoElem,
    photoset;

var init = function(){
    var itemsPerPage = Math.floor((window.innerHeight * window.innerWidth) / 10000);

    api = new ApiService({
        key: '2de373c40c00ad9091774bacf8b2cb21',
        photosetId: '72157673408266290',
        userId: '56317703%40N03',
        itemsPerPage: itemsPerPage
    });

    page = 1;
    photoset = new Photoset();
    photoElem = document.getElementById('photos');
    loadingIcon = document.getElementById('loading');
    photoElem.onscroll = checkScroll;
    fetchPhotos(page);
};

var setLoadingIcon = function(on){
    if(on){
        loadingIcon.style.display = 'block';
    } else {
        loadingIcon.style.display = 'none';
    }
};

var setHeader = function(response){
    var title = document.getElementById('albumTitle');
    title.innerHTML = response.title;
};

var fetchPhotos = function(page){
    setLoadingIcon(true);
    api.getPhotos(page, function(error, results){
        setLoadingIcon(false);
        if(error){
            alert(error.message);
        } else {
            if(results){
                itemCount = itemCount + results.photo.length;
                setHeader(results);
                pageCount = results.pages;
                photoset.addPhotos(results.photo);
            } else {
                alert('Unknown error');
            }
        }
    });
};

var fetchNextPage = function(){
    page++;
    if(page <= pageCount){
        fetchPhotos(page);
    }
};


var openLightbox = function(index){
    currentIndex = index;
    photoset.openLightbox(index);
    window.onkeyup = function(e){
        movePage(e);
    }
};

var closeLightbox = function(){
    photoset.closeLightbox();
    window.onkeyup = null;
};

var move = function(type){
    if(type == 'left'){
        currentIndex--;
        currentIndex = Math.max(0, currentIndex);
        openLightbox(currentIndex);
    } else {
        currentIndex++;
        currentIndex = Math.min(itemCount, currentIndex);
        if(currentIndex == itemCount){
            fetchNextPage();
        } else {
            openLightbox(currentIndex);
        }
    }
};

var movePage = function(e){
    if(e.keyCode == '37'){
        move('left');
    } else if(e.keyCode == '39'){
        move('right');
    } else if(e.keyCode == '27'){
        closeLightbox();
    }
};

var checkScroll = function(){
    if(photoElem.scrollTop + photoElem.offsetHeight + 1 >= photoElem.scrollHeight){
        fetchNextPage();
    }
};

window.onload = init;