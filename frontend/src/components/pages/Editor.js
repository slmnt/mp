import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Editor.module.css';

import TextEditor from '../TextEditor';
import DirTree from '../DirTree';
import TextBox from '../helper/TextBox';

import 'highlight.js/styles/vs.css'
import hljs from 'highlight.js';

import katex from 'katex';

import * as Quill from 'quill';
import 'quill/dist/quill.snow.css';
import '../Quill.css';

/*
問題
  highlight.js の language auto detection
  katex の render
*/

// highlight.js
window.hljs = hljs;
hljs.configure({
  languages: ['javascript', 'ruby', 'python'],
  useBR: false,
});

// katex
window.katex = katex;

// quill-markdown-shortcuts
(() => {
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Quill.js Plugin - Markdown Shortcuts

  function MarkdownShortcuts(quill, options) {
    var _this = this;

    _classCallCheck(this, MarkdownShortcuts);

    this.quill = quill;
    this.options = options;

    this.matches = [{
      name: 'header',
      pattern: /^(#){1,6}\s/g,
      action: function action(text, selection) {
        var size = text.trim().length;
        // Need to defer this action https://github.com/quilljs/quill/issues/1134
        setTimeout(function () {
          _this.quill.formatLine(selection.index, 0, 'header', size);
          _this.quill.deleteText(selection.index - text.length, text.length);
        }, 0);
      }
    }, {
      name: 'blockquote',
      pattern: /^(>)\s/g,
      action: function action(text, selection) {
        // Need to defer this action https://github.com/quilljs/quill/issues/1134
        setTimeout(function () {
          _this.quill.formatLine(selection.index, 1, 'blockquote', true);
          _this.quill.deleteText(selection.index - 2, 2);
        }, 0);
      }
    }, {
      name: 'code-block',
      pattern: /^`{3}(?:\s|\n)/g,
      action: function action(text, selection) {
        // Need to defer this action https://github.com/quilljs/quill/issues/1134
        setTimeout(function () {
          _this.quill.formatLine(selection.index, 1, 'code-block', true);
          _this.quill.deleteText(selection.index - 4, 4);
        }, 0);
      }
    }, {
      name: 'bolditalic',
      pattern: /(?:\*|_){3}(.+?)(?:\*|_){3}/g,
      action: function action(text, selection, pattern, lineStart) {
        var match = pattern.exec(text);

        var annotatedText = match[0];
        var matchedText = match[1];
        var startIndex = lineStart + match.index;

        if (text.match(/^([*_ \n]+)$/g)) return;

        setTimeout(function () {
          _this.quill.deleteText(startIndex, annotatedText.length);
          _this.quill.insertText(startIndex, matchedText, { bold: true, italic: true });
          _this.quill.format('bold', false);
        }, 0);
      }
    }, {
      name: 'bold',
      pattern: /(?:\*|_){2}(.+?)(?:\*|_){2}/g,
      action: function action(text, selection, pattern, lineStart) {
        var match = pattern.exec(text);

        var annotatedText = match[0];
        var matchedText = match[1];
        var startIndex = lineStart + match.index;

        if (text.match(/^([*_ \n]+)$/g)) return;

        setTimeout(function () {
          _this.quill.deleteText(startIndex, annotatedText.length);
          _this.quill.insertText(startIndex, matchedText, { bold: true });
          _this.quill.format('bold', false);
        }, 0);
      }
    }, {
      name: 'italic',
      pattern: /(?:\*|_){1}(.+?)(?:\*|_){1}/g,
      action: function action(text, selection, pattern, lineStart) {
        var match = pattern.exec(text);

        var annotatedText = match[0];
        var matchedText = match[1];
        var startIndex = lineStart + match.index;

        if (text.match(/^([*_ \n]+)$/g)) return;

        setTimeout(function () {
          _this.quill.deleteText(startIndex, annotatedText.length);
          _this.quill.insertText(startIndex, matchedText, { italic: true });
          _this.quill.format('italic', false);
        }, 0);
      }
    }, {
      name: 'strikethrough',
      pattern: /(?:~~)(.+?)(?:~~)/g,
      action: function action(text, selection, pattern, lineStart) {
        var match = pattern.exec(text);

        var annotatedText = match[0];
        var matchedText = match[1];
        var startIndex = lineStart + match.index;

        if (text.match(/^([*_ \n]+)$/g)) return;

        setTimeout(function () {
          _this.quill.deleteText(startIndex, annotatedText.length);
          _this.quill.insertText(startIndex, matchedText, { strike: true });
          _this.quill.format('strike', false);
        }, 0);
      }
    }, {
      name: 'code',
      pattern: /(?:`)(.+?)(?:`)/g,
      action: function action(text, selection, pattern, lineStart) {
        var match = pattern.exec(text);

        var annotatedText = match[0];
        var matchedText = match[1];
        var startIndex = lineStart + match.index;

        if (text.match(/^([*_ \n]+)$/g)) return;

        setTimeout(function () {
          _this.quill.deleteText(startIndex, annotatedText.length);
          _this.quill.insertText(startIndex, matchedText, { code: true });
          _this.quill.format('code', false);
          _this.quill.insertText(_this.quill.getSelection(), ' ');
        }, 0);
      }
    }, {
      name: 'hr',
      pattern: /^([-*]\s?){3}/g,
      action: function action(text, selection) {
        var startIndex = selection.index - text.length;
        setTimeout(function () {
          _this.quill.deleteText(startIndex, text.length);

          _this.quill.insertEmbed(startIndex + 1, 'hr', true, Quill.sources.USER);
          _this.quill.insertText(startIndex + 2, "\n", Quill.sources.SILENT);
          _this.quill.setSelection(startIndex + 2, Quill.sources.SILENT);
        }, 0);
      }
    }, {
      name: 'asterisk-ul',
      pattern: /^(\*|\+)\s$/g,
      action: function action(text, selection, pattern) {
        setTimeout(function () {
          _this.quill.formatLine(selection.index, 1, 'list', 'unordered');
          _this.quill.deleteText(selection.index - 2, 2);
        }, 0);
      }
    }, {
      name: 'image',
      pattern: /(?:!\[(.+?)\])(?:\((.+?)\))/g,
      action: function action(text, selection, pattern) {
        var startIndex = text.search(pattern);
        var matchedText = text.match(pattern)[0];
        // const hrefText = text.match(/(?:!\[(.*?)\])/g)[0]
        var hrefLink = text.match(/(?:\((.*?)\))/g)[0];
        var start = selection.index - matchedText.length - 1;
        if (startIndex !== -1) {
          setTimeout(function () {
            _this.quill.deleteText(start, matchedText.length);
            _this.quill.insertEmbed(start, 'image', hrefLink.slice(1, hrefLink.length - 1));
          }, 0);
        }
      }
    }, {
      name: 'link',
      pattern: /(?:\[(.+?)\])(?:\((.+?)\))/g,
      action: function action(text, selection, pattern) {
        var startIndex = text.search(pattern);
        var matchedText = text.match(pattern)[0];
        var hrefText = text.match(/(?:\[(.*?)\])/g)[0];
        var hrefLink = text.match(/(?:\((.*?)\))/g)[0];
        var start = selection.index - matchedText.length - 1;
        if (startIndex !== -1) {
          setTimeout(function () {
            _this.quill.deleteText(start, matchedText.length);
            _this.quill.insertText(start, hrefText.slice(1, hrefText.length - 1), 'link', hrefLink.slice(1, hrefLink.length - 1));
          }, 0);
        }
      }
    }];

    // Handler that looks for insert deltas that match specific characters
    this.quill.on('text-change', function (delta, oldContents, source) {
      for (var i = 0; i < delta.ops.length; i++) {
        if (delta.ops[i].hasOwnProperty('insert')) {
          if (delta.ops[i].insert === ' ') {
            _this.onSpace();
          } else if (delta.ops[i].insert === '\n') {
            _this.onEnter();
          }
        }
      }
    });
  }
  _createClass(MarkdownShortcuts, [{
    key: 'onSpace',
    value: function onSpace() {
      var selection = this.quill.getSelection();
      if (!selection) return;

      var _quill$getLine = this.quill.getLine(selection.index),
          _quill$getLine2 = _slicedToArray(_quill$getLine, 2),
          line = _quill$getLine2[0],
          offset = _quill$getLine2[1];

      var text = line.domNode.textContent;
      var lineStart = selection.index - offset;
      if (typeof text !== 'undefined' && text) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.matches[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var match = _step.value;

            var matchedText = text.match(match.pattern);
            if (matchedText) {
              // We need to replace only matched text not the whole line
              console.log('matched', match.name, text);
              match.action(text, selection, match.pattern, lineStart);
              return;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }
  }, {
    key: 'onEnter',
    value: function onEnter() {
      var selection = this.quill.getSelection();
      if (!selection) return;

      var _quill$getLine3 = this.quill.getLine(selection.index),
          _quill$getLine4 = _slicedToArray(_quill$getLine3, 2),
          line = _quill$getLine4[0],
          offset = _quill$getLine4[1];

      var text = line.domNode.textContent + ' ';
      var lineStart = selection.index - offset;
      selection.length = selection.index++;
      if (typeof text !== 'undefined' && text) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.matches[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var match = _step2.value;

            var matchedText = text.match(match.pattern);
            if (matchedText) {
              console.log('matched', match.name, text);
              match.action(text, selection, match.pattern, lineStart);
              return;
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    }
  }]);

  Quill.register('modules/markdownShortcuts', MarkdownShortcuts)
})();


//
class TestIFrame extends React.Component {
  componentDidMount() {
      this._updateIframe();
  }
  componentDidUpdate() {
      this._updateIframe();
  }
  _updateIframe() {
      const iframe = this.refs.iframe;
      const document = iframe.contentDocument;
      document.body.innerHTML = this.props.content;
      /*
      const head = document.getElementsByTagName('head')[0];
      this.props.stylesheets.forEach(url => {
          const ref = document.createElement('link');
          ref.rel = 'stylesheet';
          ref.type = 'text/css';
          ref.href = url;
          head.appendChild(ref);
      });*/
  }

  render() {
      return (<iframe
        allowFullScreen={true}
        sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts"
        allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor"
        ref="iframe"/>)
  }
}





class SlideEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      boxHeight: 50,
      draggingBox: null, //参照
      boxInitialPos: null,

    }

    this.slideNameInput = React.createRef();
  }
  editorRef(element) {
    /* quill.js
      https://github.com/quilljs/quill/blob/develop/docs/_includes/standalone/full.html
      
      buildButtons():  button を作成
        ql-*
      buildPickers(), fillSelect():  picker を作成
        var ALIGNS = [false, 'center', 'right', 'justify'];
        var COLORS = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"];
        var FONTS = [false, 'serif', 'monospace'];
        var HEADERS = ['1', '2', '3', false];
        var SIZES = ['small', false, 'large', 'huge'];
    */
   /* old options
      toolbar: [
          [
            {font: []},
            {size: ['small', false, 'large', 'huge']}
          ],
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [
            {color: []},
            {background: []}
          ],
          [
            {script: 'sub'},
            {script: 'super'}
          ],
          [
            {list: 'ordered' }, { list: 'bullet' },
            {indent: '-1'}, {indent: '+1'}
          ],
          [
            {direction: 'rtl'},
            {align: ['center', 'right', 'justify']}
          ],
          ['blockquote', 'code', 'code-block'],
          ['link', 'image', 'video', 'formula'],
          ['clean'],
        ],
   */
    var quill = new Quill(element, {
      modules: {
        toolbar: [
            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
          
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction
          
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],
          
            ['clean']                                         // remove formatting button
        ],
        markdownShortcuts: {},
        syntax: hljs,
      },
      placeholder: 'ここに記入してください...',
      bounds: "#editorContainer",
      theme: 'snow'
    });
  }

  getBoxPos(el, localX, localY) {
    let rect = el.getBoundingClientRect();
    let ly = localY - rect.y;
    return parseInt(ly / this.state.boxHeight);
  }
  getBox(pos) {
    if (!this.props.currentChapter) return;
    for (let v of this.props.currentChapter.slides) {
      if (v.pos === pos) return v;
    }
  }

  onDragStart = (e) => {
    e.dataTransfer.effectAllowed = 'copy'
    e.dataTransfer.setData('dummy', 123);

    let pos = this.getBoxPos(e.currentTarget, 0, e.clientY);

    let box = this.getBox(pos);
    if (box) {
      this.draggingBox = box;
    }
  }
  onDrop = (e) => {
    if (!e.dataTransfer.getData('dummy')) return;
    e.preventDefault();
    if (!this.draggingBox) return;

    let pos = this.getBoxPos(e.currentTarget, 0, e.clientY);
    if (pos != this.lastPos || this.draggingBox != this.lastBox) {
      this.props.moveBox(this.draggingBox.pos, pos);
    }
  }
  onDragOver = (e) => {
    e.preventDefault();
  }

  clickSlide = (slide) => {
    this.props.openSlide(slide);
  }
  
  setSlideName = (name) => {
    this.slideNameInput.current.value = name;
  }

  render() {
    return (
      <div className={styles["slides-main-container"]}>
        <div className={styles["slides-side-container"]}>
          <div className={styles["slides-side"]} style={{position: "relative"}}
            onDragOver={this.onDragOver}
            onDragStart={this.onDragStart}
            onDrop={this.onDrop}
          >
            {
              this.props.currentChapter && this.props.currentChapter.slides.map((v,i) => {
                return (<div key={i}
                  className={styles["slides-side-element"]}
                  draggable
                  style={{
                    height: this.state.boxHeight + "px",
                    top: v.pos * this.state.boxHeight + "px",
                    zIndex: this.draggingBox === v ? 1 : 0
                  }}
                  onClick={() => {this.clickSlide(v)}}
                >
                  <div style={{width: "100%", height: "100%"}}>
                    {v.pos}: {v.name}
                  </div>
                </div>);
              })

            }
          </div>
        </div>

        <div className={styles["slides-main-container-2"]}>
          <div className={styles["slides-main"]}>
            <div id="editorContainer">
              <div className={styles["slides-header"]}>
                <input type="text" className={styles.textbox} ref={this.slideNameInput} className={styles["slides-name"]} />
                <div className={styles["slides-header-control"]}>
                  <div><div>Markdown</div></div>
                </div>
              </div>
              <div ref={this.editorRef}>
              </div>
              {/*
              <TestIFrame content={`
                <html><body>
                <style>.po {width: 100%; height: 100%; background-color: blue;} </style>
                <h1>hellonfj</h1>
                <div class="po"></div>
                </body></html>
              `} />
              */}
            </div>
            </div>
          <div className={styles["slides-footer"]}>
            FOOTEER
          </div>
        </div>
      </div>
    )
  }

}

class FileEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
    this.window = React.createRef();
  }

  render() {
    return (
      <div
          style={{
          display: "flex",
          lineHeight: "120%",
          fontSize: "0.6em",
          color: "#cccccc",
          height: "100%",
          width: "100%",
          }}
      >
          <div
              style={{
                  flex: "0 0 auto",
                  width: "200px",
                  overflow: "hidden auto",
                  borderRight: "1px solid #666666",
              }}
          >
          {/*
          */}
          <DirTree dir={this.props.directory} openFile={path => {this.window.current.openTab(path);}} />

          </div>
          <div
              style={{
                  flex: "1 1 auto",
                  height: "100%",
                  width: "100%",      
              }}
          >
              <TextEditor ref={this.window} />
            {/*
            */}

          </div>
      </div>
    )
  }
}

//
class Editor extends Component {
  constructor (props) {
    super(props);
    this.state = {
      courseData: {
        name: "testcoure",
        chapters: [
          {
            name: "testhcapter",
            slides: [
              {
                name: "sl whataa awana aw we 1   wd dwa",
                text: "dwwdw",
                pos: -1
              },
              {
                name: "wish we could turn back time",
                text: "dwwdw",
                pos: -1
              },
              {
                name: "to the good old days",
                text: "dwwdw",
                pos: -1
              }
            ]
          }
        ],
        files: [], // base 64?
        directory: { // directory structure
          children: [
            {
              name: "src",
              children: [
                {
                  name: "index.js"
                }
              ]
            },
            { name: "app.js" },
            { name: "app1.js" },
            { name: "app2.js" },
            { name: "app3.js" },
          ]
        },
      },
      currentChapter: null,
      currentSlide: null,
      currentTab: 0,
    }

    this.courseNameInput = React.createRef();
    this.chapterNameInput = React.createRef();

    this.slideEditor = React.createRef();
  }
  componentDidMount() {
    this.loadCourse(this.state.courseData); // テスト test
  }


  moveBox = (from, to) => {
    if (!this.slideEditor.current.getBox(to)) return;

    let target = this.slideEditor.current.getBox(from);
    let forward = from < to;
    let p = forward ? -1 : 1;
    for (let v of this.state.currentChapter.slides) {
      if (forward ? v.pos >= from && v.pos <= to : v.pos >= to && v.pos <= from) v.pos += p;
    }
    target.pos = to;
    this.lastPos = to;
    this.lastBox = target;

    this.setState({courseData: this.state.courseData})
  }

  loadCourse = (data) => {
    //
    for (let ch of data.chapters) {
      for (let i in ch.slides) {
        ch.slides[i].pos = parseInt(i);
      }
    }

    //
    this.courseNameInput.current.value = this.state.courseData.name;

    //
    this.setState({
      courseData: data
    }, () => {
      this.openChapter(this.state.courseData.chapters[0]);
      this.openSlide(this.state.courseData.chapters[0].slides[0]);
    })
  }
  openChapter = (chapter) => {
    this.setState({currentChapter: chapter}, () => {
      //this.chapterNameInput.current.value = chapter.name;
    });
  }
  openSlide = (slide) => {
    this.setState({currentSlide: slide}, () => {
      this.slideEditor.current.setSlideName(slide.name);
    });
  }
  openTab = (id) => {
    this.setState({currentTab: id});
  }

  openChapterMenu = () => {
    
  }

  render() {
    return (
      <div style={{height: "100%"}}>
        <div className={styles.container}>
          <div className={styles.header}>
            <input type="text" className={styles["course-name"]} ref={this.courseNameInput} />
            <div className={styles["chapters-btn"]} onClick={() => this.openChapterMenu()}>
              チャプター一覧
            </div>
            <div className={styles["header-controls"]}>
              <div className={styles["discard-controls"]}><span>戻る</span></div>
              <div className={styles["preview-controls"]}><span>プレビュー</span></div>
              <div className={styles["save-controls"]}><span>保存</span></div>
            </div>
          </div>
          <div className={styles.tablist}>
            <div onClick={() => this.openTab(0)}>スライド</div>
            <div onClick={() => this.openTab(1)}>コード (ファイル)</div>
          </div>
          <div className={styles["editor-container"]}>
            <div style={{backgroundColor: "var(--bg-color)", zIndex: "0"}}>
            </div>
            <div style={{zIndex: this.state.currentTab === 0 ? "1" : "-1"}} >
              <SlideEditor ref={this.slideEditor} courseData={this.state.courseData} currentChapter={this.state.currentChapter} currentSlide={this.state.currentSlide} moveBox={this.moveBox} openSlide={this.openSlide} />
            </div>
            <div style={{zIndex: this.state.currentTab === 1 ? "1" : "-1"}} >
              <FileEditor directory={this.state.courseData.directory} />
            </div>
          </div>

        </div>

      </div>
    );
  }
}

export default Editor;
