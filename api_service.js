/* API-Service for flickr helper
 * ----------------------------
 * Make photolist calls with this helper function
 * Requires options object
 * options = {
 *      key: Flickr API Service Key
 *      photoset: Flickr photoset id we will be polling from
 *      userId: Flickr userId used to fetch photos with
 *      itemsPerPage: Items per page we want to call
 * }
 */

var ApiService = function(options){
    this.key = options.key;
    this.photosetId = options.photosetId;
    this.userId = options.userId;
    this.itemsPerPage = options.itemsPerPage;
    this.pageCount = 0;
};

ApiService.prototype.getPhotos = function(page, callback){

    if(this.page > this.pageCount){
        return callback(null);
    }

    var url = [
            'https://api.flickr.com/services/rest/',
            '?method=flickr.photosets.getPhotos',
            '&api_key=', this.key,
            '&photoset_id=', this.photosetId,
            '&user_id=', this.userId,
            '&per_page=', this.itemsPerPage,
            '&page=', page,
            '&format=json&nojsoncallback=1'
        ].join('');

    get(url, function(error, response){
        if(error){
            callback(error);
        } else {
            if(response && response.photoset){
                this.pageCount = response.photoset.pages;
                callback(null, response.photoset);
            } else {
                callback(new Error('Sorry, we were not able to retrieve your photos at this time.'));
            }
        }
    });
};

var get = function(url, callback){
    var
        request = new XMLHttpRequest(),
        object;

    request.onreadystatechange = function(){
        if(request.readyState == 4 && request.status == 200){
            try {
                object = JSON.parse(request.responseText);
            } catch(e){
                return callback(new Error('Sorry, we were not able to retrieve that photo.'))
            }
            callback(null, object);
        }
    };

    request.open("GET", url, true); // true for asynchronous
    request.send(null);
};