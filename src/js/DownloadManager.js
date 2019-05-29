class DownloadManager {
  constructor(root) {
    this._root = root;
    this._form = {};
    this._inputFile = {};
    this._listFile = {};
    this._button = {};
  }

  _eventButtonDrop(e) {
    e.preventDefault();

    this._addImageInList(e.dataTransfer.files);
    this._eventButtonLeave();
  }

  _eventButtonEnter() {
    this._button.innerHTML = '+';
    this._button.style.fontSize = '50px';
  }

  _eventButtonLeave() {
    this._button.innerHTML = 'Drag and Drop files here or Click to select';
    this._button.removeAttribute('style');
  }

  _uiImage(file) {
    const image = document.createElement('a');
    const remove = document.createElement('button');
    const item = document.createElement('li');
    const url = URL.createObjectURL(file);

    image.className = 'download-manager__image';
    image.download = file.name;
    image.href = url;
    image.style.backgroundImage = `url(${url})`;

    remove.className = 'download-manager__remove-image';
    remove.innerHTML = 'X';
    remove.addEventListener('click', () => item.remove());

    item.className = 'download-manager__item-image';
    item.appendChild(image);
    item.appendChild(remove);

    return item;
  }

  _addImageInList(files) {
    const regexp = new RegExp('^(image/)', 'i');

    for (const file of files) {
      if (regexp.test(file.type)) {
        const img = this._uiImage(file);

        this._listFile.prepend(img);
      }
    }
  }

  _changeInputFile(e) {
    e.preventDefault();

    this._addImageInList(e.currentTarget.files);
    e.currentTarget.value = '';
  }


  _createFormImage() {
    this._button = document.createElement('button');
    this._button.className = 'download-manager__form-button';
    this._button.innerHTML = 'Drag and Drop files here or Click to select';
    this._button.addEventListener('click', () => {
      this._inputFile.dispatchEvent(new MouseEvent('click'));
    });
    this._button.addEventListener('dragenter', this._eventButtonEnter.bind(this), false);
    this._button.addEventListener('dragleave', this._eventButtonLeave.bind(this), false);
    this._button.addEventListener('dragover', e => e.preventDefault());
    this._button.addEventListener('drop', this._eventButtonDrop.bind(this), false);

    this._inputFile = document.createElement('input');
    this._inputFile.type = 'file';
    this._inputFile.className = 'download-manager__form-file';
    this._inputFile.name = 'image';
    this._inputFile.accept = 'image/*';
    this._inputFile.multiple = true;
    this._inputFile.addEventListener('change', this._changeInputFile.bind(this));

    this._form = document.createElement('form');
    this._form.className = 'download-manager__form';
    this._form.appendChild(this._button);
    this._form.appendChild(this._inputFile);
    this._form.addEventListener('submit', e => e.preventDefault());

    return this._form;
  }

  _createListImage() {
    this._listFile = document.createElement('ul');
    this._listFile.className = 'download-manager__list-image';

    return this._listFile;
  }

  init() {
    this._root.appendChild(this._createFormImage());
    this._root.appendChild(this._createListImage());
  }
}

export default DownloadManager;
