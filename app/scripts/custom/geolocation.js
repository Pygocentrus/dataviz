var Location = {
    isLocated: false,
    error: '',
    coordinates: {
        latitude: '',
        longitude: ''
    },
    callback: function() {},
};

/**
 * This function initialize the Location object's
 * ending callback function
 * @param  {Function} cb  The callback function
 * @return {NULL}         None
 */
Location.init = function(cb) {
    this.callback = cb;
};

/**
 * Asks for the current user location
 * depending on the browser support
 * @return {NULL} None
 */
Location.askLocation = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            this.whenLocated,
            this.whenError, {
                enableHighAccuracy: true,
                timeout: 7000
            }
        );
    } else {
        this.isLocated = false;
        this.error = 'Votre navigateur ne supporte pas la géolocalisation';
        Location.callback(this, this.error);
    }
};

/**
 * This function is called wether the location
 * was successfully found
 * @param  {Object} location  The user location - latitude/longitude object
 * @return {NONE}             None
 */
Location.whenLocated = function(location) {
    isLocated = true;
    Location.updateStyle();
    setTimeout(function(){
        toggleScroll();
        Location.callback.call(this, location);
    }, 1000);
};

/**
 * This function is called wether the location
 * was infortunately aborted
 * @param  {Object} location  The location error
 * @return {NONE}             None
 */
Location.whenError = function(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            this.error = 'Vous avez refuse l\'acces a la geolocalisation.';
            break;
        case error.POSITION_UNAVAILABLE:
            this.error = 'Les informations de geolocalisation sont indisponibles.';
            break;
        case error.TIMEOUT:
            this.error = 'Le temps de reponse de la requete est trop long - arret.';
            break;
        case error.UNKNOWN_ERROR:
        default:
            this.error = 'Erreur inconnue';
            break;
    }
    this.isLocated = false;
    Location.callback.call(this, error);
};

/**
 * Checks wether the user has been already located
 * @return {Boolean} The assertion
 */
Location.userIsLocated = function() {
    return this.isLocated;
};

/**
 * Returns the location's failure message
 * @return {String} The message
 */
Location.getError = function() {
    return this.error;
};

Location.updateStyle = function() {
    pGeolocation.innerHTML = '';
    pGeolocation.style.backgroundImage = "url('img/goutte.gif')";
    pGeolocation.style.backgroundPosition = "center center";
    pGeolocation.style.width = "70px";
    pGeolocation.style.height = "70px";
    pGeolocation.style.borderRadius = "50%";
}
