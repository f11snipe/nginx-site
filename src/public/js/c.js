$(function(){var s,a,i=[],p=["wtf is going on","how did this console get here?","hopefully i can turn it off..."],t="/var/log/nginx",o=1e3,n=1e3,l="f11snipe",u="nginx",m=[{gid:0,name:"root"}],c=[{gid:n,name:l},{gid:1001,name:"web"}],h="x86_64",d="5.13.0-1022-aws",g="Linux",f="GNU/Linux",v=h,w=h,y=g+` ${u} ${d} #24~20.04.1-Ubuntu SMP Thu Apr 7 22:10:15 UTC 2022 ${v} ${h} ${w} `+f,k=`
usage: sudo -h | -K | -k | -V
usage: sudo -v [-AknS] [-g group] [-h host] [-p prompt] [-u user]
usage: sudo -l [-AknS] [-g group] [-h host] [-p prompt] [-U user] [-u user] [command]
usage: sudo [-AbEHknPS] [-r role] [-t type] [-C num] [-g group] [-h host] [-p prompt] [-T timeout] [-u user] [VAR=value] [-i|-s] [<command>]
usage: sudo -e [-AknS] [-r role] [-t type] [-C num] [-g group] [-h host] [-p prompt] [-T timeout] [-u user] file ...
`,b=`
  total 69
  -rw-r----- 1 ${l} ${l}    69 Apr 29 16:22 access.log
  -rw-r----- 1 ${l} ${l}    69 Apr 29 16:22 error.log
  -rw-r----- 1 ${l} ${l}    69 Apr 29 16:22 snipe.log
  -rwxr-xr-x 1 ${l} ${l}   420 Apr 29 17:20 <span class="ex">watch</span>
  `,A=()=>l+`@${u}:${t}# `,x=["/","$","\\","-","*","&","^","#","@"," ","!","(",")","[","]","|","'",'"',"Tab","ArrowUp","ArrowDown"],S=$("pre#console"),L={"snipe.log":"/logs/snipe.log","error.log":"/logs/error.log","access.log":"/logs/access.log",watch:"/logs/watch.sh"},T=Object.keys(L);function r(){var e=document.getElementById("console");e.scrollTop=e.scrollHeight}function e(){S.append(`
`+A())}function U(e){s=setInterval(()=>{$.get(e,e=>{S.html(e),r()})},500)}var j=(e,r)=>{e=e[0]||T[0];s&&clearInterval(s),L[e]&&U(L[e])};function C(e,r){$.get(`/art/${e}.txt?art=curl`,r)}var K={id:(e,r)=>r(`uid=${o}(${l}) gid=${n}(${l}) groups=`+c.map(e=>`${e.gid}(${e.name})`).join(",")),cd:(e,r)=>{t=e[0],r("")},uname:(e,r)=>{if(!e[0])return r("Linux");switch(e[0]){case"-a":return r(y);case"-s":return r(g);case"-n":return r(u);case"-r":return r(d);case"-m":return r(v);case"-p":return r(h);case"-i":return r(w);case"-o":return r(f);case"--help":return r(`
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
`);default:return r(`
uname: invalid option -- '${e[0]?e[0].replace(/^-/,""):""}'
Try 'uname --help' for more information.
`)}},sudo:(e,r)=>{e[0]?"--help"===e[0]||"-h"===e[0]?r(`
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
`):"su"===e[0]?(n=o=0,l="root",c=m,r("")):"-l"===e[0]?r(`
Matching Defaults entries for ubuntu on localhost:
  insults, env_reset, mail_badpass, secure_path=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin

User ubuntu may run the following commands on localhost:
  (ALL : ALL) ALL
  (ALL) NOPASSWD: ALL
`):r(k):r(k)},groups:(e,r)=>r(c.map(e=>e.name).join(" ")),ftw:(e,r)=>C("ftw",r),snipe:(e,r)=>C("ftw",r),f11snipe:(e,r)=>C("ftw",r),lol:(e,r)=>C("lol-70",r),derp:(e,r)=>C("derp-60",r),glhf:(e,r)=>C("glhf",r),pwd:(e,r)=>r(t),ssh:(e,r)=>r("You wish!"),exit:(e,r)=>{"f11snipe"!==l?(n=o=1e3,l="f11snipe",r("")):r("Umm, noooo")},help:(e,r)=>r("NO!"),shit:(e,r)=>r("Watch your language!"),fuck:(e,r)=>r("Watch your language!"),host:(e,r)=>r(u),hostname:(e,r)=>r(u),tail:j,watch:j,"./watch":j,whoami:(e,r)=>r(l),clear:(e,r)=>{S.html(""),r("")},history:(e,r)=>r(p.map((e,r)=>(r+1).toString().padStart(5)+`	`+e).join(`
`)),cat:(e,r)=>{e=e[0];if(!e||!L[e])return r("hmmm, not sure what you lookin for...");$.get(L[e],r)},ls:(e,r)=>{var t=/^-[a-z]*l[a-z]*/;e[0]&&t.test(e[0])?e[0]&&t.test(e[0])&&r(b):r('access.log  error.log  snipe.log  <span class="ex">watch</span>')}},O=()=>{p.push(i.join("")),i=[],a=null,e(),r()};$(document).on("keydown",function(e){if(S.hasClass("active")){switch(e.key){case"Tab":var r=i.join("").trim().split(" ").map(e=>e.trim()).pop().replace(/^\.\//,"");T.forEach(e=>{0===e.indexOf(r)&&(e=e.substring(r.length),S.append(e),i=i.concat(Array.from(e)))});break;case"Enter":o=(n=i.join("").split(" "))[0],n=n.slice(1),S.append(`
`),K[o]&&"function"==typeof K[o]?K[o](n,e=>{S.append(e),O()}):(""!==o&&S.append(`Command '${o}' not found.`),O());break;case"Backspace":i.length&&(S.html(S.html().slice(0,-1)),i.pop());break;case"ArrowUp":0<(a=a||p.length)&&(a--,i=Array.from(p[a]),S.html(`
`+A()+i.join("")));break;case"ArrowDown":a&&a<p.length-1&&(a++,i=Array.from(p[a]),S.html(`
`+A()+i.join("")));break;default:if(e.altKey||e.ctrlKey||e.shiftKey){var t=e;switch(t.key){case"c":case"C":case"d":case"D":case"z":case"Z":t.ctrlKey&&s&&(clearInterval(s),O());break;case"v":case"V":t.ctrlKey&&navigator.clipboard.readText().then(e=>{e&&(S.append(e),i=i.concat(Array.from(e)))});break;default:t.ctrlKey&&t.shiftKey||1===t.key.length&&(S.append(t.key),i.push(t.key))}}else 1===e.key.length&&(S.append(e.key),i.push(e.key))}var o,n;return x.includes(e.key)?(e.preventDefault(),!1):void 0}}),S.on("click",function(e){S.addClass("active")}),e()});