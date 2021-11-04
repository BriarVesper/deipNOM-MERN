import axios from 'axios';

const recipeDelegate = {

  /**
   * @returns {Object} List of recipe items
   */
  getAllRecipes: () => {
    return axios.get('http://localhost:8081/recipes', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  },

  /**
   * Creation of new recipe item
   * @param {Object} recipe Object consisting of all recipe information to save
   * @param {function} callback Response handler
   * @param {function} errback Error handler
   */
  submit: (recipe, callback, errback) => {
    axios.post('http://localhost:8081/recipes/create', recipe)
      .then((res) => {
        callback && callback(res);
      }).catch((error) => {
        errback && errback(error);
      });
  },
  /**
   * Upload thumbnail to Cloudinary to get the URL
   * @param {Blob} blob The image uploaded by the user
   */
  uploadThumbnail: async (blob) => {
    function blobToBase64(blob) {
      return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    }

    let b64blob = await blobToBase64(blob);
    return axios.post('http://localhost:8081/image/upload', {
        'blob': b64blob
      })
      .then(res => {
        return res.data;
      })
      .catch(err => console.log(err))
  },
  /**
   * Deletion of Recipe item
   * @param {String} id The id of the item to delete
   * @param {function} callback Response handler
   * @param {function} errback Error handler
   */
  remove: (id, callback, errback) => {
    axios.delete('http://localhost:8081/recipes/' + id)
      .then((res) => {
        callback && callback(res);
      }).catch((error) => {
        errback && errback(error);
      });
  },
  /**
   * Updating of a Recipe item
   * @param {String} recipe The id of the item to delete
   * @param {function} callback Response handler
   * @param {function} errback Error handler
   */
   edit: (recipe, callback, errback) => {
    axios.post('http://localhost:8081/recipes/edit', recipe)
      .then((res) => {
        callback && callback(res);
      }).catch((error) => {
        errback && errback(error);
      });
  },
};

export default recipeDelegate;
