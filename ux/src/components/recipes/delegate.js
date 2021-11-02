import axios from 'axios';

const recipeDelegate = {

  /**
   * @returns {Object} List of ToDo items
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
   * @param {File} file The image uploaded by the user
   */
     uploadThumbnail: async (file) => {
      let fd = new FormData();
      fd.append("file", file);
      fd.append("upload_preset", "deipnon");
      fd.append("cloud_name", "au-octavii");
      return fetch("https://api.cloudinary.com/v1_1/au-octavii/upload", {
        method: "post",
        body: fd
      })
      .then(res => res.json())
      .then(data => {
        return data.url;
      })
      .catch(err => console.log());
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
