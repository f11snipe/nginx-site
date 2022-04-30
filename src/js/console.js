var LS_SIM = `access.log  error.log  snipe.log  <span class="ex">watch</span>`;
var LS_ALL = `
total 69
-rw-r----- 1 root root    69 Apr 29 16:22 access.log
-rw-r----- 1 root root    69 Apr 29 16:22 error.log
-rw-r----- 1 root root    69 Apr 29 16:22 snipe.log
-rwxr-xr-x 1 root root   420 Apr 29 17:20 <span class="ex">watch</span>
`;

$(function() {
  var buff = [];
  var hist = ['wtf is going on', 'how did this console get here?', 'hopefully i can turn it off...'];
  var cwd = '/var/log/nginx';
  var user = 'root';
  var host = 'nginx';
  var processor = 'x86_64';
  var kernelRel = '5.13.0-1022-aws';
  var kernelName = 'Linux';
  var operationSys = 'GNU/Linux';
  var machine = processor;
  var hardware = processor;
  var kernelVer = '#24~20.04.1-Ubuntu SMP Thu Apr 7 22:10:15 UTC 2022'
  var uname = `${kernelName} ${host} ${kernelRel} ${kernelVer} ${machine} ${processor} ${hardware} ${operationSys}`;
  var interval, pointer;

  var prompt = () => `${user}@${host}:${cwd}# `;
  var disableKeys = ['/', '$', '\\', '-', '*', '&', '^', '#', '@', ' ', '!', '(', ')', '[', ']', '|', 'Tab', 'ArrowUp', 'ArrowDown'];
  var $console = $('pre#console');
  var fileMap = {
    'snipe.log': '/logs/snipe.log',
    'error.log': '/logs/error.log',
    'access.log': '/logs/access.log',
    'watch': '/logs/watch.sh'
  };
  var allowFiles = Object.keys(fileMap);

  function scroll() {
    var elem = document.getElementById('console');
    elem.scrollTop = elem.scrollHeight;
  }

  function doPrompt() {
    $console.append(`\n${prompt()}`);
  }

  function getLogs(file) {
    $.get(file, (data) => {
      $console.html(data);
      scroll();
    });
  }

  function doWatch(file) {
    interval = setInterval(() => {
      getLogs(file);
    }, 500);
  }

  function activate() {
    $console.addClass('active');
  }

  function deactivate() {
    $console.removeClass('active');
  }

  var watch = (args, cb) => {
    var file = args[0] || allowFiles[0];

    if (interval) clearInterval(interval);

    if (fileMap[file]) {
      doWatch(fileMap[file]);
    }
  };

  function art(name, cb) {
    $.get(`/art/${name}.txt?art=curl`, cb);
  }

  /**
   *
      uname -a
      curl
      wget
      cat /etc/passwd
      groups
      cat /etc/crontab
      cat /etc/sudoers.d
      ls -la /opt
      reboot
      sudo -l
      sudo su
      nc
      echo
      cat /root/.ssh/id_rsahostname
      uname -a
      curl
      wget
      cat /etc/passwd
      groups
      cat /etc/crontab
      cat /etc/sudoers.d
      ls -la /opt
      reboot
      sudo -l
      sudo su
      nc
      echo
      cat /root/.ssh/id_rsa
   */

  var troll = {
    id: (args, cb) => cb('uid=0(root) gid=0(root) groups=0(root)'),
    cd: (args, cb) => {
      cwd = args[0];
      cb('');
    },
    uname: (args, cb) => {
      if (!args[0]) return cb('Linux');

      switch (args[0]) {
        case '-a':
          return cb(uname);
        case '-s':
          return cb(kernelName);
        case '-n':
          return cb(host);
        case '-r':
          return cb(kernelRel);
        case '-m':
          return cb(machine);
        case '-p':
          return cb(processor);
        case '-i':
          return cb(hardware);
        case '-o':
          return cb(operationSys);
        case '--help':
          return cb(`
Usage: uname [OPTION]...
Print certain system information.  With no OPTION, same as -s.

  -a, --all                print all information, in the following order,
                              except omit -p and -i if unknown:
  -s, --kernel-name        print the kernel name
  -n, --nodename           print the network node hostname
  -r, --kernel-release     print the kernel release
  -v, --kernel-version     print the kernel version
  -m, --machine            print the machine hardware name
  -p, --processor          print the processor type (non-portable)
  -i, --hardware-platform  print the hardware platform (non-portable)
  -o, --operating-system   print the operating system
      --help     display this help and exit
      --version  output version information and exit

GNU coreutils online help: <https://www.gnu.org/software/coreutils/>
Report uname translation bugs to <https://translationproject.org/team/>
Full documentation at: <https://www.gnu.org/software/coreutils/uname>
or available locally via: info '(coreutils) uname invocation'
`);
        default:
          return cb(`
uname: invalid option -- '${args[0] ? args[0].replace(/^-/,''): ''}'
Try 'uname --help' for more information.
`);
      }
    },
    ftw: (args, cb) => art('ftw', cb),
    snipe: (args, cb) => art('ftw', cb),
    f11snipe: (args, cb) => art('ftw', cb),
    lol: (args, cb) => art('lol-70', cb),
    derp: (args, cb) => art('derp-60', cb),
    glhf: (args, cb) => art('glhf', cb),
    pwd: (args, cb) => cb(cwd),
    ssh: (args, cb) => cb('You wish!'),
    exit: (args, cb) => cb('Umm, noooo'),
    help: (args, cb) => cb('NO!'),
    shit: (args, cb) => cb('Watch your language!'),
    fuck: (args, cb) => cb('Watch your language!'),
    host: (args, cb) => cb(host),
    hostname: (args, cb) => cb(host),
    tail: watch,
    watch,
    './watch': watch,
    whoami: (args, cb) => cb(user),
    clear: (args, cb) => {
      $console.html('');
      cb('');
    },
    history: (args, cb) => cb(hist.map((v,i) => `${(i+1).toString().padStart(5)}\t${v}`).join(`\n`)),
    cat: (args, cb) => {
      var file = args[0];

      if (!file || !fileMap[file]) {
        return cb('hmmm, not sure what you lookin for...');
      }

      $.get(fileMap[file], cb);
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
    hist.push(buff.join(''));
    buff = [];
    pointer = null;
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
    if (!$console.hasClass('active')) return;

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
      case 'ArrowUp':
        if (!pointer) pointer = hist.length;

        if (pointer > 0) {
          pointer--;
          buff = Array.from(hist[pointer]);
          $console.html(`\n${prompt()}${buff.join('')}`);
        }

        break;
      case 'ArrowDown':
        if (pointer && pointer < hist.length-1) {
          pointer++;
          buff = Array.from(hist[pointer]);
          $console.html(`\n${prompt()}${buff.join('')}`);
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

  $(document).on('keydown', handleKey);

  $console.on('click', function(event) {
    activate();
  });

  doPrompt();
});
