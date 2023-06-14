$(function() {
  var buff = [];
  var hist = ['wtf is going on', 'how did this console get here?', 'hopefully i can turn it off...'];
  var cwd = '/var/log/nginx';
  var uid = 1000;
  var gid = 1000;
  var user = 'f11snipe';
  var host = 'nginx';
  var userGroups = [{ gid, name: user }, { gid: 1001, name: 'web' }];
  var rootGroups = [{ gid: 0, name: 'root' }];
  var groups = userGroups;
  var processor = 'x86_64';
  var kernelRel = '5.13.0-1022-aws';
  var kernelName = 'Linux';
  var operationSys = 'GNU/Linux';
  var machine = processor;
  var hardware = processor;
  var kernelVer = '#24~20.04.1-Ubuntu SMP Thu Apr 7 22:10:15 UTC 2022'
  var uname = `${kernelName} ${host} ${kernelRel} ${kernelVer} ${machine} ${processor} ${hardware} ${operationSys}`;
  var interval, pointer, lastWatch;

  var sudoHelp = `
sudo - execute a command as another user

usage: sudo -h | -K | -k | -V
usage: sudo -v [-AknS] [-g group] [-h host] [-p prompt] [-u user]
usage: sudo -l [-AknS] [-g group] [-h host] [-p prompt] [-U user] [-u user] [command]
usage: sudo [-AbEHknPS] [-r role] [-t type] [-C num] [-g group] [-h host] [-p prompt] [-T timeout] [-u user] [VAR=value] [-i|-s] [<command>]
usage: sudo -e [-AknS] [-r role] [-t type] [-C num] [-g group] [-h host] [-p prompt] [-T timeout] [-u user] file ...

Options:
  -A, --askpass                 use a helper program for password prompting
  -b, --background              run command in the background
  -B, --bell                    ring bell when prompting
  -C, --close-from=num          close all file descriptors >= num
  -E, --preserve-env            preserve user environment when running command
      --preserve-env=list       preserve specific environment variables
  -e, --edit                    edit files instead of running a command
  -g, --group=group             run command as the specified group name or ID
  -H, --set-home                set HOME variable to target user's home dir
  -h, --help                    display help message and exit
  -h, --host=host               run command on host (if supported by plugin)
  -i, --login                   run login shell as the target user; a command may also be specified
  -K, --remove-timestamp        remove timestamp file completely
  -k, --reset-timestamp         invalidate timestamp file
  -l, --list                    list user's privileges or check a specific command; use twice for longer format
  -n, --non-interactive         non-interactive mode, no prompts are used
  -P, --preserve-groups         preserve group vector instead of setting to target's
  -p, --prompt=prompt           use the specified password prompt
  -r, --role=role               create SELinux security context with specified role
  -S, --stdin                   read password from standard input
  -s, --shell                   run shell as the target user; a command may also be specified
  -t, --type=type               create SELinux security context with specified type
  -T, --command-timeout=timeout terminate command after the specified time limit
  -U, --other-user=user         in list mode, display privileges for user
  -u, --user=user               run command (or edit file) as specified user name or ID
  -V, --version                 display version information and exit
  -v, --validate                update user's timestamp without running a command
  --                            stop processing command line arguments
`;

  var sudoUsage = `
usage: sudo -h | -K | -k | -V
usage: sudo -v [-AknS] [-g group] [-h host] [-p prompt] [-u user]
usage: sudo -l [-AknS] [-g group] [-h host] [-p prompt] [-U user] [-u user] [command]
usage: sudo [-AbEHknPS] [-r role] [-t type] [-C num] [-g group] [-h host] [-p prompt] [-T timeout] [-u user] [VAR=value] [-i|-s] [<command>]
usage: sudo -e [-AknS] [-r role] [-t type] [-C num] [-g group] [-h host] [-p prompt] [-T timeout] [-u user] file ...
`;

  var sudoList = `
Matching Defaults entries for ubuntu on localhost:
  insults, env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User ubuntu may run the following commands on localhost:
  (ALL : ALL) ALL
  (ALL) NOPASSWD: ALL
`;

  var rmHelp = `
Usage: rm [OPTION]... [FILE]...
Remove (unlink) the FILE(s).

  -f, --force           ignore nonexistent files and arguments, never prompt
  -i                    prompt before every removal
  -I                    prompt once before removing more than three files, or
                          when removing recursively; less intrusive than -i,
                          while still giving protection against most mistakes
      --interactive[=WHEN]  prompt according to WHEN: never, once (-I), or
                          always (-i); without WHEN, prompt always
      --one-file-system  when removing a hierarchy recursively, skip any
                          directory that is on a file system different from
                          that of the corresponding command line argument
      --no-preserve-root  do not treat '/' specially
      --preserve-root[=all]  do not remove '/' (default);
                              with 'all', reject any command line argument
                              on a separate device from its parent
  -r, -R, --recursive   remove directories and their contents recursively
  -d, --dir             remove empty directories
  -v, --verbose         explain what is being done
      --help     display this help and exit
      --version  output version information and exit

By default, rm does not remove directories.  Use the --recursive (-r or -R)
option to remove each listed directory, too, along with all of its contents.

To remove a file whose name starts with a '-', for example '-foo',
use one of these commands:
  rm -- -foo

  rm ./-foo

Note that if you use rm to remove a file, it might be possible to recover
some of its contents, given sufficient expertise and/or time.  For greater
assurance that the contents are truly unrecoverable, consider using shred.

GNU coreutils online help: <https://www.gnu.org/software/coreutils/>
Report any translation bugs to <https://translationproject.org/team/>
Full documentation <https://www.gnu.org/software/coreutils/rm>
or available locally via: info '(coreutils) rm invocation'
`;

  var lsOut = `access.log  error.log  snipe.log  watch`;
  var lsAll = `
  total 69
  -rw-r----- 1 ${user} ${user}    69 Apr 29 16:22 access.log
  -rw-r----- 1 ${user} ${user}    69 Apr 29 16:22 error.log
  -rw-r----- 1 ${user} ${user}    69 Apr 29 16:22 snipe.log
  -rwxr-xr-x 1 ${user} ${user}   420 Apr 29 17:20 watch
  `;

  var prompt = () => `${user}@${host}:${cwd}# `;
  var disableKeys = ['/', '$', '\\', '-', '*', '&', '^', '#', '@', ' ', '!', '(', ')', '[', ']', '|', "'", '"', '<', '>', 'Tab', 'ArrowUp', 'ArrowDown'];
  var $console = $('pre#console');
  var fileMap = {
    'snipe.log': '/logs/snipe.log',
    'error.log': '/logs/error.log',
    'access.log': '/logs/access.log',
    'watch': '/logs/watch.sh'
  };
  var allowFiles = Object.keys(fileMap);

  var fakeFs = {
    'bin': {
      'bash': '',
      'cat': '',
      'chgrp': '',
      'chmod': '',
      'chown': '',
      'cp': '',
      'dash': '',
      'date': '',
      'dd': '',
      'df': '',
      'dir': '',
      'dmesg': '',
      'dnsdomainname': '',
      'domainname': '',
      'echo': '',
      'egrep': '',
      'false': '',
      'fgrep': '',
      'findmnt': '',
      'grep': '',
      'gunzip': '',
      'gzexe': '',
      'gzip': '',
      'hostname': '',
      'ln': '',
      'login': '',
      'ls': '',
      'lsblk': '',
      'mkdir': '',
      'mknod': '',
      'mktemp': '',
      'more': '',
      'mount': '',
      'mountpoint': '',
      'mv': '',
      'nisdomainname': '',
      'pidof': '',
      'pwd': '',
      'rbash': '',
      'readlink': '',
      'rm': '',
      'rmdir': '',
      'run-parts': '',
      'sed': '',
      'sh': '',
      'sleep': '',
      'stty': '',
      'su': '',
      'sync': '',
      'tar': '',
      'tempfile': '',
      'touch': '',
      'true': '',
      'umount': '',
      'uname': '',
      'uncompress': '',
      'vdir': '',
      'wdctl': '',
      'ypdomainname': '',
      'zcat': '',
      'zcmp': '',
      'zdiff': '',
      'zegrep': '',
      'zfgrep': '',
      'zforce': '',
      'zgrep': '',
      'zless': '',
      'zmore': '',
      'znew': '',
    },
    'boot': {},
    'dev': {},
    'etc': {
      'hostname': '',
      'nginx': {
        'nginx.conf': '',
      }
    },
    'home': {
      'f11snipe': {
        '.bashrc': '',
      }
    },
    'lib': {},
    'media': {},
    'mnt': {},
    'opt': {},
    'proc': {},
    'root': {
      '.bashrc': '',
      'root.txt': '',
    },
    'sbin': {},
    'srv': {},
    'tmp': {
      'tmp-1325ab1351ac91': {},
    },
    'usr': {
      'bin': {},
      'games': {},
      'include': {},
      'lib': {},
      'libexec': {},
      'local': {},
      'sbin': {},
      'share': {},
      'src': {},
    },
    'var': {
      'backups': {},
      'cache': {},
      'lib': {},
      'local': {},
      'log': {
        'auth.log': '',
        'btmp': '',
        'dpkg.log': '',
        'faillog': '',
        'lastlog': '',
        'nginx': {
          'snipe.log': '',
          'error.log': '',
          'access.log': '',
          'watch': '',
        },
        'wtmp': '',
      },
      'mail': {},
      'opt': {},
      'spool': {},
      'tmp': {},
    },
  }

  function scroll() {
    var elem = document.getElementById('console');
    elem.scrollTop = elem.scrollHeight;
  }

  function doPrompt() {
    $console.append(document.createTextNode(`\n${prompt()}`));
  }

  function getLogs(file) {
    $.get(file, (data) => {
      if (!lastWatch || lastWatch.trim() === '') {
        $console.append(document.createTextNode(data));
      } else if (data.length > lastWatch.length) {

        var diff = data.substring(lastWatch.length);
        $console.append(document.createTextNode(diff));
      }

      lastWatch = data;
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

  function resolvePath(path, cb) {
    var context = fakeFs;
    var parent = fakeFs;
    var cwdParts = cwd.split('/').filter(p => p);
    var newPath = path;
    newPath = newPath.replace(/\/+/g, '/');

    if (newPath[0] === '/') {
      cwdParts = [];
    }

    newPath.split('/').filter(p => p).forEach(pathPart => {
      if (pathPart === '..') {
        cwdParts.pop();
      } else {
        cwdParts.push(pathPart);
      }
    });

    for (var i = 0; i < cwdParts.length; i++) {
      var parent = context;
      var step = context[cwdParts[i]];

      if (typeof step === 'undefined') {
        return cb(`'${newPath}': No such file or directory`);
      } else {
        context = step;
      }
    }

    var res = cwdParts.join('/');

    if (res[0] !== '/') {
      res = '/' + res;
    }

    cb(null, res, context, parent, cwdParts[cwdParts.length-1]);
  }

  var troll = {
    id: (args, cb) => cb(`uid=${uid}(${user}) gid=${gid}(${user}) groups=${groups.map(g => `${g.gid}(${g.name})`).join(',')}`),
    cd: (args, cb) => {
      if (args[0]) {
        resolvePath(args[0], (err, path, ctx) => {
          if (err) {
            cb(`bash: cd: ${err}`);
          } else {
            if (typeof ctx === 'string') {
              cb(`bash: cd: '${path}': Not a directory`);
            } else {
              cwd = path;
              cb('');
            }
          }
        });
      } else {
        cb('');
      }
    },
    flag: (args, cb) => {
      cb(`Awww, ok ... F11[chattrcleanup]`);
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
    sudo: (args, cb) => {
      if (!args[0]) {
        cb(sudoUsage);
      } else if (args[0] === '--help' || args[0] === '-h') {
        cb(sudoHelp);
      } else if (args[0] === 'su') {
        uid = 0;
        gid = 0;
        user = 'root';
        groups = rootGroups;
        cb('');
      } else if (args[0] === '-l') {
        cb(sudoList);
      } else {
        cb(sudoUsage);
      }
    },
    groups: (args, cb) => cb(groups.map(g => g.name).join(' ')),
    ftw: (args, cb) => art('ftw', cb),
    snipe: (args, cb) => art('ftw', cb),
    f11snipe: (args, cb) => art('ftw', cb),
    lol: (args, cb) => art('lol-70', cb),
    derp: (args, cb) => art('derp-60', cb),
    glhf: (args, cb) => art('glhf', cb),
    pwd: (args, cb) => cb(cwd),
    ssh: (args, cb) => cb('You wish!'),
    exit: (args, cb) => {
      if (user !== 'f11snipe') {
        uid = 1000;
        gid = 1000;
        user = 'f11snipe';
        cb('');
      } else {
        cb('Umm, noooo');
      }
    },
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
      $console.text('');
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
      var lsPath = args.filter(a => a[0] !== '-')[0] || cwd;
      var lsExtra = args.filter(a => lsTest.test(a)).length > 0;

      resolvePath(lsPath, (err, path, ctx) => {
        if (err) {
          cb(`ls: cannot access ${err}`);
        } else {
          var lines = Object.keys(ctx).map(fsKey => {
            fsVal = ctx[fsKey];

            if (lsExtra) {
              if (typeof fsVal === 'object') {
                return `drwxr-xr-x   1 root root 4096 Feb  2 00:00 ${fsKey}`;
              } else {
                return `-rwxr-xr-x   1 root root 1234 Feb  2 00:00 ${fsKey}`;
              }
            } else {
              return fsKey;
            }
          });

          cb(lines.join(`\n`));
        }
      });
    },
    rm: (args, cb) => {
      var rmPath = args.filter(a => a[0] !== '-')[0];

      if (!rmPath) {
        return cb(`rm: missing operand\nTry 'rm --help' for more information.`);
      }

      if (args.filter(a => a === '--help').length) {
        return cb(rmHelp);
      }

      resolvePath(rmPath, (err, path, ctx, par, key) => {
        if (err) {
          cb(`rm: cannot remove ${err}`);
        } else {
          delete par[key];
          cb('');
        }
      });
    },
    mv: (args, cb) => {
      cb('COMING SOON LOL ...');
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
    var full = buff.join('').trim().split(' ').map(s => s.trim());
    var cmd = full[0];
    var args = full.slice(1);

    $console.append(`\n`);

    if (interval && lastWatch) {
      // No-op (inside "watch" interval)
    } else if (troll[cmd] && typeof troll[cmd] === 'function') {
      troll[cmd](args, (res) => {
        $console.append(document.createTextNode(res));
        done();
      });
    } else {
      if (cmd !== '') {
        $console.append(document.createTextNode(`Command '${cmd}' not found.`));
      }
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
          if (interval) clearInterval(interval);
          lastWatch = null;
          done();
        }
        break;
      case 'v':
      case 'V':
        if (event.ctrlKey) {
          navigator.clipboard.readText().then((copied) => {
            if (copied) {
              $console.append(document.createTextNode(copied));
              buff = buff.concat(Array.from(copied));
            }
          });
        }
        break;
      default:
        if (event.ctrlKey && event.shiftKey) {
          // console.debug('Ignore special key', event);
        } else if (event.key.length === 1) {
          $console.append(document.createTextNode(event.key));
          if (interval && lastWatch) {
            // No-op, don't build cmd buffer during watch, but allow display
          } else {
            buff.push(event.key);
          }
        } else {
          // console.debug('Ignore special key', event);
        }
        break;
    }
  }

  function handleKey(event) {
    if (!$console.hasClass('active')) return;

    // console.log(event.key, event);

    switch (event.key) {
      case 'Tab':
        var current = buff.join('').trim();
        var parts = current.split(' ').map(p => p.trim());
        var last = parts.pop().replace(/^\.\//, '');

        allowFiles.forEach(file => {
          if (file.indexOf(last) === 0) {
            var part = file.substring(last.length);
            $console.append(document.createTextNode(part));
            buff = buff.concat(Array.from(part));
          }
        });

        break;
      case 'Enter':
        handleInput();
        break;
      case 'Backspace':
        if (buff.length) {
          $console.text($console.text().slice(0, -1));
          buff.pop();
        }
        break;
      case 'ArrowUp':
        if (!pointer) pointer = hist.length;

        if (pointer > 0) {
          pointer--;
          buff = Array.from(hist[pointer]);
          $console.text(`\n${prompt()}${buff.join('')}`);
        }

        break;
      case 'ArrowDown':
        if (pointer && pointer < hist.length-1) {
          pointer++;
          buff = Array.from(hist[pointer]);
          $console.text(`\n${prompt()}${buff.join('')}`);
        }

        break;
      default:
        if (event.altKey || event.ctrlKey || event.shiftKey) {
          handleSpecialKey(event);
        } else if (event.key.length === 1) {
          $console.append(document.createTextNode(event.key));
          if (interval && lastWatch) {
            // No-op, don't build cmd buffer during watch, but allow display
          } else {
            buff.push(event.key);
          }
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
