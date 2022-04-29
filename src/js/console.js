var LS_SIM = `access.log  error.log  <span class="ex">watch</span>`;
var LS_ALL = `
total 92
-rw-r----- 1 root root    69 Apr 29 16:22 access.log
-rw-r----- 1 root root    69 Apr 29 16:22 error.log
-rwxr-xr-x 1 root root   118 Apr 29 17:20 <span class="ex">watch</span>
`;

$(function() {
  var buff = [];
  var cwd = '/var/log/nginx';
  var user = 'root';
  var host = 'nginx';
  var interval, timeout;

  var prompt = `${user}@${host}:${cwd}# `;
  var disableKeys = ['/', '$', '\\', '-', '*', '&', '^', '#', '@', ' ', '!', '(', ')', '[', ']', '|', 'Tab'];
  var $console = $('pre#console');
  var fileMap = {
    'access.log': '/logs/access.log',
    'error.log': '/logs/error.log',
    'watch': '/logs/watch.sh'
  };
  var allowFiles = Object.keys(fileMap);

  function scroll() {
    var elem = document.getElementById('console');
    elem.scrollTop = elem.scrollHeight;
  }

  function doPrompt() {
    $console.append(`\n${prompt}`);
  }

  function render(file) {
    return setInterval(() => {
      $.get(file, (data) => {
        $console.text(data);
        scroll();
      });
    }, 500);

    // var timeout = setTimeout(() => {
    //   clearInterval(interval);
    // }, 30000);
  }

  function activate() {
    $console.addClass('active');
  }

  function deactivate() {
    $console.removeClass('active');
  }

  var watch = (args, cb) => {
    var file = args[0] || allowFiles[0];

    if (fileMap[file]) {
      interval = render(fileMap[file]);
    }
  };

  var troll = {
    id: (args, cb) => cb('uid=0(root) gid=0(root) groups=0(root)'),
    pwd: (args, cb) => cb(cwd),
    watch,
    './watch': watch,
    clear: (args, cb) => {
      $console.text('');
      cb('');
    },
    whoami: (args, cb) => cb(user),
    cat: (args, cb) => {
      var file = args[0];

      if (!file || !fileMap[file]) {
        return cb('hmmm, not sure what you lookin for...');
      }

      $.get(fileMap[file], cb);
    },
    tail: (args, cb) => {
      var file = args[0];

      if (!file || !fileMap[file]) {
        return cb('hmmm, not sure what you lookin for...');
      }

      $.get(fileMap[file], (data) => {
        var lines = data.split(`\n`);
        var keep = lines.slice(lines.length - 10);
        return cb(keep.join(`\n`));
      });
    },
    ls: (args, cb) => {
      var lsTest = /^-[a-z]*l[a-z]*/;
      var lsOut = 'none';

      if (!args[0] || !lsTest.test(args[0])) {
        lsOut = LS_SIM;
      } else if (args[0] && lsTest.test(args[0])) {
        lsOut = LS_ALL;
      }

      cb(lsOut);
    },
  };

  var done = () => {
    buff = [];
    doPrompt();
    scroll();
  };

  function handleInput() {
    var full = buff.join('').split(' ');
    var cmd = full[0];
    var args = full.slice(1);

    $console.append(`\n`);

    if (troll[cmd] && typeof troll[cmd] === 'function') {
      troll[cmd](args, (res) => {
        $console.append(res);
        done();
      });
    } else {
      $console.append(`Command '${cmd}' not found.`);
      done();
    }
  }

  function handleSpecialKey(event) {
    switch (event.key) {
      case 'c':
      case 'C':
      case 'd':
      case 'D':
      case 'z':
      case 'Z':
        if (event.ctrlKey) {
          if (interval) {
            clearInterval(interval);
            done();
          }
        }
        break;
      case 'v':
      case 'V':
        if (event.ctrlKey) {
          navigator.clipboard.readText().then((copied) => {
            if (copied) {
              // console.debug('Pasting copied text:', copied);
              $console.append(copied);
              buff = buff.concat(Array.from(copied));
            }
          });
        }
        break;
      default:
        if (event.ctrlKey && event.shiftKey) {
          // console.debug('Ignore special key', event);
        } else if (event.key.length === 1) {
          $console.append(event.key);
          buff.push(event.key);
        } else {
          // console.debug('Ignore special key', event);
        }
        break;
    }
  }

  function handleKey(event) {
    switch (event.key) {
      case 'Tab':
        var current = buff.join('').trim();
        var parts = current.split(' ').map(p => p.trim());
        var last = parts.pop().replace(/^\.\//, '');

        allowFiles.forEach(file => {
          if (file.indexOf(last) === 0) {
            var part = file.substring(last.length);
            $console.append(part);
            buff = buff.concat(Array.from(part));
          }
        });

        break;
      case 'Enter':
        handleInput();
        break;
      case 'Backspace':
        if (buff.length) {
          $console.html($console.html().slice(0, -1));
          buff.pop();
        }
        break;
      default:
        if (event.altKey || event.ctrlKey || event.shiftKey) {
          handleSpecialKey(event);
        } else if (event.key.length === 1) {
          $console.append(event.key);
          buff.push(event.key);
        } else {
          // console.debug('Ignoring key', event.key);
        }
        break;
    }

    if (disableKeys.includes(event.key)) {
      event.preventDefault();

      return false;
    }
  }

  $(document).on('keydown', handleKey);

  // $(document).on('visibilitychange', function(event) {
  //   deactivate();
  // });

  // $(document).on('mousedown', function(event) {
  //   console.log('click', event.target, event.target.id, event.target.getAttribute('id'));

  //   if (event.target.id === $console.id) {
  //     activate();
  //   } else {
  //     deactivate();
  //   }
  // });

  $console.on('click', function(event) {
    activate();
  });

  doPrompt();
});
