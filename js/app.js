import { getPosts, searchPostsByText, createPost } from './api/postsAPI.js';
import { renderState, clearState } from './components/uiState.js';
import { renderPosts, clearPosts } from './components/postView.js';
import { getFormData, resetForm } from './components/createPostView.js';
import { isValidPost } from './utils/helpers.js';

const navButtons = document.querySelectorAll('.nav-btn');
const views = document.querySelectorAll('.view');

const homeView = document.getElementById('home-view');
const createView = document.getElementById('create-view');

const postsStateContainer = document.getElementById('posts-state-container');
const createStateContainer = document.getElementById('create-state-container');
const postsList = document.getElementById('posts-list');

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const clearSearchBtn = document.getElementById('clear-search-btn');

const createPostForm = document.getElementById('create-post-form');
const resetFormBtn = document.getElementById('reset-form-btn');

let lastAction = loadAllPosts;

init();

function init() {
  bindNavigation();
  bindEvents();

  renderState(postsStateContainer, 'idle', {
    title: 'Estado idle',
    message: 'La aplicación está lista para cargar posts.'
  });

  renderState(createStateContainer, 'idle', {
    title: 'Formulario en espera',
    message: 'Completa los campos para crear un nuevo post.'
  });

  loadAllPosts();
}

function bindNavigation() {
  navButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const targetView = button.dataset.view;

      navButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      views.forEach(view => view.classList.remove('active'));

      if (targetView === 'home') {
        homeView.classList.add('active');
      } else {
        createView.classList.add('active');
      }
    });
  });
}

function bindEvents() {
  searchBtn.addEventListener('click', () => {
    const value = searchInput.value.trim();
    if (!value) {
      loadAllPosts();
      return;
    }
    searchPosts(value);
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    loadAllPosts();
  });

  createPostForm.addEventListener('submit', handleCreatePost);
  resetFormBtn.addEventListener('click', () => {
    resetForm(createPostForm);

    renderState(createStateContainer, 'idle', {
      title: 'Formulario limpio',
      message: 'Puedes escribir un nuevo post.'
    });
  });
}

async function loadAllPosts() {
  lastAction = loadAllPosts;
  clearPosts(postsList);

  renderState(postsStateContainer, 'loading', {
    title: 'Cargando...',
    message: 'Obteniendo listado de posts desde la API.'
  });

  try {
    const data = await getPosts();
    const posts = data.posts ?? [];

    if (posts.length === 0) {
      renderState(postsStateContainer, 'empty', {
        title: 'Sin resultados',
        message: 'No se encontraron posts.'
      });
      return;
    }

    renderPosts(postsList, posts);

    renderState(postsStateContainer, 'success', {
      title: 'Carga exitosa',
      message: `Se cargaron ${posts.length} posts correctamente.`
    });
  } catch (error) {
    renderState(postsStateContainer, 'error', {
      title: 'Error al cargar posts',
      message: error.message || 'Ocurrió un error inesperado.',
      buttonText: 'Retry',
      onRetry: () => lastAction()
    });
  }
}

async function searchPosts(text) {
  lastAction = () => searchPosts(text);
  clearPosts(postsList);

  renderState(postsStateContainer, 'loading', {
    title: 'Buscando...',
    message: `Buscando posts que coincidan con "${text}".`
  });

  try {
    const data = await searchPostsByText(text);
    const posts = data.posts ?? [];

    if (posts.length === 0) {
      renderState(postsStateContainer, 'empty', {
        title: 'Estado empty',
        message: `No hay posts que coincidan con "${text}".`
      });
      return;
    }

    renderPosts(postsList, posts);

    renderState(postsStateContainer, 'success', {
      title: 'Búsqueda exitosa',
      message: `Se encontraron ${posts.length} posts para "${text}".`
    });
  } catch (error) {
    renderState(postsStateContainer, 'error', {
      title: 'Error en la búsqueda',
      message: error.message || 'No fue posible completar la búsqueda.',
      buttonText: 'Retry',
      onRetry: () => lastAction()
    });
  }
}

async function handleCreatePost(event) {
  event.preventDefault();

  const postData = getFormData(createPostForm);

  if (!isValidPost(postData)) {
    renderState(createStateContainer, 'error', {
      title: 'Datos inválidos',
      message: 'Completa correctamente título, contenido y userId.',
      buttonText: 'Retry',
      onRetry: () => {
        renderState(createStateContainer, 'idle', {
          title: 'Corrige el formulario',
          message: 'Revisa los campos e intenta nuevamente.'
        });
      }
    });
    return;
  }

  renderState(createStateContainer, 'loading', {
    title: 'Enviando...',
    message: 'Creando post en la API.'
  });

  try {
    const createdPost = await createPost(postData);

    renderState(createStateContainer, 'success', {
      title: 'Post creado',
      message: `Se creó el post "${createdPost.title}" correctamente.`
    });

    prependCreatedPost(createdPost);
    resetForm(createPostForm);
  } catch (error) {
    renderState(createStateContainer, 'error', {
      title: 'Error al crear post',
      message: error.message || 'No se pudo crear el post.',
      buttonText: 'Retry',
      onRetry: () => handleRetryCreate(postData)
    });
  }
}

async function handleRetryCreate(postData) {
  renderState(createStateContainer, 'loading', {
    title: 'Reintentando...',
    message: 'Intentando crear el post nuevamente.'
  });

  try {
    const createdPost = await createPost(postData);

    renderState(createStateContainer, 'success', {
      title: 'Post creado',
      message: `Se creó el post "${createdPost.title}" correctamente.`
    });

    prependCreatedPost(createdPost);
    resetForm(createPostForm);
  } catch (error) {
    renderState(createStateContainer, 'error', {
      title: 'Error al crear post',
      message: error.message || 'Sigue fallando el envío.',
      buttonText: 'Retry',
      onRetry: () => handleRetryCreate(postData)
    });
  }
}

function prependCreatedPost(post) {
  const currentCards = postsList.innerHTML.trim();

  const fakePost = {
    ...post,
    tags: post.tags ?? ['new']
  };

  const tempContainer = document.createElement('div');
  renderPosts(tempContainer, [fakePost]);

  postsList.innerHTML = tempContainer.innerHTML + currentCards;

  renderState(postsStateContainer, 'success', {
    title: 'Listado actualizado',
    message: 'Se agregó el nuevo post al inicio del home.'
  });
}