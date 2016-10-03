/* PhotoSet prototype
 * ----------------------------
 * Store photos in a lightbox set
 * Controls lightbox and current photo to display
 */

var Photoset = function(){
    this.photos = [];
    this.currentIndex = 0;
    this.listTag = document.getElementById('photos');
    this.image = document.getElementById('image');
    this.lightbox = document.getElementById('lightbox');
};

Photoset.prototype.addPhotos = function(photos){
    var
        i,
        photoElem,
        photo;

    for(i = 0; i < photos.length; i++){
        photo = new Photo({
            photo: photos[i]
        });

        this.photos.push(photo);

        photoElem = photo.generateThumbnail(this.currentIndex + i);

        this.listTag.appendChild(photoElem);
    }
    this.currentIndex = this.currentIndex + i;
};

Photoset.prototype.openLightbox = function(index){
    this.lightbox.style.display = "block";
    this.image.style.backgroundImage = ['url("',
        this.photos[index].generateLightbox(), '")'].join('');
};

Photoset.prototype.closeLightbox = function(){
    this.image.style.backgroundImage = '';
    this.lightbox.style.display = "none";
};