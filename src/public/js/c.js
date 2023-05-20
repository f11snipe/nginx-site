$(function(){var a,s,i,p=[],u=["wtf is going on","how did this console get here?","hopefully i can turn it off..."],r="/var/log/nginx",o=1e3,n=1e3,l="f11snipe",c="nginx",m=[{gid:0,name:"root"}],d=[{gid:n,name:l},{gid:1001,name:"web"}],h="x86_64",g="5.13.0-1022-aws",f="Linux",w="GNU/Linux",v=h,y=h,k=f+` ${c} ${g} #24~20.04.1-Ubuntu SMP Thu Apr 7 22:10:15 UTC 2022 ${v} ${h} ${y} `+w,b=`
usage: sudo -h | -K | -k | -V
usage: sudo -v [-AknS] [-g group] [-h host] [-p prompt] [-u user]
usage: sudo -l [-AknS] [-g group] [-h host] [-p prompt] [-U user] [-u user] [command]
usage: sudo [-AbEHknPS] [-r role] [-t type] [-C num] [-g group] [-h host] [-p prompt] [-T timeout] [-u user] [VAR=value] [-i|-s] [<command>]
usage: sudo -e [-AknS] [-r role] [-t type] [-C num] [-g group] [-h host] [-p prompt] [-T timeout] [-u user] file ...
`,x=`
  total 69
  -rw-r----- 1 ${l} ${l}    69 Apr 29 16:22 access.log
  -rw-r----- 1 ${l} ${l}    69 Apr 29 16:22 error.log
  -rw-r----- 1 ${l} ${l}    69 Apr 29 16:22 snipe.log
  -rwxr-xr-x 1 ${l} ${l}   420 Apr 29 17:20 watch
  `,A=()=>l+`@${c}:${r}# `,T=["/","$","\\","-","*","&","^","#","@"," ","!","(",")","[","]","|","'",'"',"<",">","Tab","ArrowUp","ArrowDown"],S=$("pre#console"),L={"snipe.log":"/logs/snipe.log","error.log":"/logs/error.log","access.log":"/logs/access.log",watch:"/logs/watch.sh"},N=Object.keys(L);function U(){var e=document.getElementById("console");e.scrollTop=e.scrollHeight}function e(){S.append(document.createTextNode(`
`+A()))}function j(e){a=setInterval(()=>{$.get(e,e=>{var t;i&&""!==i.trim()?e.length>i.length&&(t=e.substring(i.length),S.append(document.createTextNode(t))):S.append(document.createTextNode(e)),i=e,U()})},500)}var t=(e,t)=>{e=e[0]||N[0];a&&clearInterval(a),L[e]&&j(L[e])};function C(e,t){$.get(`/art/${e}.txt?art=curl`,t)}var K={id:(e,t)=>t(`uid=${o}(${l}) gid=${n}(${l}) groups=`+d.map(e=>`${e.gid}(${e.name})`).join(",")),cd:(e,t)=>{r=e[0],t("")},flag:(e,t)=>{t("Awww, ok ... F11[chattrcleanup]")},uname:(e,t)=>{if(!e[0])return t("Linux");switch(e[0]){case"-a":return t(k);case"-s":return t(f);case"-n":return t(c);case"-r":return t(g);case"-m":return t(v);case"-p":return t(h);case"-i":return t(y);case"-o":return t(w);case"--help":return t(`
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
`);default:return t(`
uname: invalid option -- '${e[0]?e[0].replace(/^-/,""):""}'
Try 'uname --help' for more information.
`)}},sudo:(e,t)=>{e[0]?"--help"===e[0]||"-h"===e[0]?t(`
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
`):"su"===e[0]?(n=o=0,l="root",d=m,t("")):"-l"===e[0]?t(`
Matching Defaults entries for ubuntu on localhost:
  insults, env_reset, mail_badpass, secure_path=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin

User ubuntu may run the following commands on localhost:
  (ALL : ALL) ALL
  (ALL) NOPASSWD: ALL
`):t(b):t(b)},groups:(e,t)=>t(d.map(e=>e.name).join(" ")),ftw:(e,t)=>C("ftw",t),snipe:(e,t)=>C("ftw",t),f11snipe:(e,t)=>C("ftw",t),lol:(e,t)=>C("lol-70",t),derp:(e,t)=>C("derp-60",t),glhf:(e,t)=>C("glhf",t),pwd:(e,t)=>t(r),ssh:(e,t)=>t("You wish!"),exit:(e,t)=>{"f11snipe"!==l?(n=o=1e3,l="f11snipe",t("")):t("Umm, noooo")},help:(e,t)=>t("NO!"),shit:(e,t)=>t("Watch your language!"),fuck:(e,t)=>t("Watch your language!"),host:(e,t)=>t(c),hostname:(e,t)=>t(c),tail:t,watch:t,"./watch":t,whoami:(e,t)=>t(l),clear:(e,t)=>{S.text(""),t("")},history:(e,t)=>t(u.map((e,t)=>(t+1).toString().padStart(5)+`	`+e).join(`
`)),cat:(e,t)=>{e=e[0];if(!e||!L[e])return t("hmmm, not sure what you lookin for...");$.get(L[e],t)},ls:(e,t)=>{var r=/^-[a-z]*l[a-z]*/;e[0]&&r.test(e[0])?e[0]&&r.test(e[0])&&t(x):t("access.log  error.log  snipe.log  watch")}},O=()=>{u.push(p.join("")),p=[],s=null,e(),U()};$(document).on("keydown",function(e){if(S.hasClass("active")){switch(e.key){case"Tab":var t=p.join("").trim().split(" ").map(e=>e.trim()).pop().replace(/^\.\//,"");N.forEach(e=>{0===e.indexOf(t)&&(e=e.substring(t.length),S.append(document.createTextNode(e)),p=p.concat(Array.from(e)))});break;case"Enter":o=(n=p.join("").trim().split(" ").map(e=>e.trim()))[0],n=n.slice(1),S.append(`
`),a&&i||(K[o]&&"function"==typeof K[o]?K[o](n,e=>{S.append(document.createTextNode(e)),O()}):(""!==o&&S.append(document.createTextNode(`Command '${o}' not found.`)),O()));break;case"Backspace":p.length&&(S.text(S.text().slice(0,-1)),p.pop());break;case"ArrowUp":0<(s=s||u.length)&&(s--,p=Array.from(u[s]),S.text(`
`+A()+p.join("")));break;case"ArrowDown":s&&s<u.length-1&&(s++,p=Array.from(u[s]),S.text(`
`+A()+p.join("")));break;default:if(e.altKey||e.ctrlKey||e.shiftKey){var r=e;switch(r.key){case"c":case"C":case"d":case"D":case"z":case"Z":r.ctrlKey&&(a&&clearInterval(a),i=null,O());break;case"v":case"V":r.ctrlKey&&navigator.clipboard.readText().then(e=>{e&&(S.append(document.createTextNode(e)),p=p.concat(Array.from(e)))});break;default:r.ctrlKey&&r.shiftKey||1===r.key.length&&(S.append(document.createTextNode(r.key)),a&&i||p.push(r.key))}}else 1===e.key.length&&(S.append(document.createTextNode(e.key)),a&&i||p.push(e.key))}var o,n;return T.includes(e.key)?(e.preventDefault(),!1):void 0}}),S.on("click",function(e){S.addClass("active")}),e()});