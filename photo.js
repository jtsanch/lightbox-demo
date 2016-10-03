/* Photo prototype
 * ----------------------------
 * Store photo object and generate thumbnail
 * and lightbox html
 * -----------------------
 * options = {
 *      photo: {
 *          farm: farm that server is in
 *          secret: secret key
 *          server: server that photo is on
 *          id: photo id
 *          title: photo title
 *      }
 * }
 */
var Photo = function(options){
    this.photo = options.photo;
    this.thumbnailElem = false;
    this.lightboxElem = false;
};

Photo.prototype.generateThumbnail = function(index){

    if(this.thumbnailElem){
        return this.thumbnailElem;
    }

    this.thumbnailElem = document.createElement('div');
    this.thumbnailElem.innerHTML = generateHTML(index, this.photo, 't');

    return this.thumbnailElem;
};

Photo.prototype.generateLightbox = function(){

    if(this.lightboxElem){
        return this.lightboxElem;
    }

    return generateHTML(0, this.photo, 'h');
};

var generateHTML = function(index, photo, size){
    var
        url = [
        'https://farm', photo.farm,
        '.staticflickr.com/', photo.server,
        '/', photo.id,'_', photo.secret,
        '_', size, '.jpg'
    ].join('');

    if(size == 't'){
        return [
            '<img src="', url,
            '" title="', photo.title, '"',
            ' onclick="openLightbox(',index,')"/>'
        ].join('');
    } else {
        return url;
    }
};