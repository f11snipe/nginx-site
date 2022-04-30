$(function(){var a,i,p=[],u=["wtf is going on","how did this console get here?","hopefully i can turn it off..."],t="/var/log/nginx",n=1e3,o=1e3,s="f11snipe",l="nginx",c=[{gid:0,name:"root"}],m=[{gid:o,name:s},{gid:1001,name:"web"}],d="x86_64",h="5.13.0-1022-aws",g="Linux",f="GNU/Linux",v=d,w=d,y=g+` ${l} ${h} #24~20.04.1-Ubuntu SMP Thu Apr 7 22:10:15 UTC 2022 ${v} ${d} ${w} `+f,k=`
usage: sudo -h | -K | -k | -V
usage: sudo -v [-AknS] [-g group] [-h host] [-p prompt] [-u user]
usage: sudo -l [-AknS] [-g group] [-h host] [-p prompt] [-U user] [-u user] [command]
usage: sudo [-AbEHknPS] [-r role] [-t type] [-C num] [-g group] [-h host] [-p prompt] [-T timeout] [-u user] [VAR=value] [-i|-s] [<command>]
usage: sudo -e [-AknS] [-r role] [-t type] [-C num] [-g group] [-h host] [-p prompt] [-T timeout] [-u user] file ...
`,b=`
  total 69
  -rw-r----- 1 ${s} ${s}    69 Apr 29 16:22 access.log
  -rw-r----- 1 ${s} ${s}    69 Apr 29 16:22 error.log
  -rw-r----- 1 ${s} ${s}    69 Apr 29 16:22 snipe.log
  -rwxr-xr-x 1 ${s} ${s}   420 Apr 29 17:20 <span class="ex">watch</span>
  `,x=()=>s+`@${l}:${t}# `,A=["/","$","\\","-","*","&","^","#","@"," ","!","(",")","[","]","|","'",'"',"<",">","Tab","ArrowUp","ArrowDown"],S=$("pre#console"),L={"snipe.log":"/logs/snipe.log","error.log":"/logs/error.log","access.log":"/logs/access.log",watch:"/logs/watch.sh"},T=Object.keys(L);function r(){var e=document.getElementById("console");e.scrollTop=e.scrollHeight}function e(){S.append(`
`+x())}function U(e){a=setInterval(()=>{$.get(e,e=>{S.text(e),r()})},500)}var j=(e,r)=>{e=e[0]||T[0];a&&clearInterval(a),L[e]&&U(L[e])};function C(e,r){$.get(`/art/${e}.txt?art=curl`,r)}var K={id:(e,r)=>r(`uid=${n}(${s}) gid=${o}(${s}) groups=`+m.map(e=>`${e.gid}(${e.name})`).join(",")),cd:(e,r)=>{t=e[0],r("")},uname:(e,r)=>{if(!e[0])return r("Linux");switch(e[0]){case"-a":return r(y);case"-s":return r(g);case"-n":return r(l);case"-r":return r(h);case"-m":return r(v);case"-p":return r(d);case"-i":return r(w);case"-o":return r(f);case"--help":return r(`
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
`):"su"===e[0]?(o=n=0,s="root",m=c,r("")):"-l"===e[0]?r(`
Matching Defaults entries for ubuntu on localhost:
  insults, env_reset, mail_badpass, secure_path=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin

User ubuntu may run the following commands on localhost:
  (ALL : ALL) ALL
  (ALL) NOPASSWD: ALL
`):r(k):r(k)},groups:(e,r)=>r(m.map(e=>e.name).join(" ")),ftw:(e,r)=>C("ftw",r),snipe:(e,r)=>C("ftw",r),f11snipe:(e,r)=>C("ftw",r),lol:(e,r)=>C("lol-70",r),derp:(e,r)=>C("derp-60",r),glhf:(e,r)=>C("glhf",r),pwd:(e,r)=>r(t),ssh:(e,r)=>r("You wish!"),exit:(e,r)=>{"f11snipe"!==s?(o=n=1e3,s="f11snipe",r("")):r("Umm, noooo")},help:(e,r)=>r("NO!"),shit:(e,r)=>r("Watch your language!"),fuck:(e,r)=>r("Watch your language!"),host:(e,r)=>r(l),hostname:(e,r)=>r(l),tail:j,watch:j,"./watch":j,whoami:(e,r)=>r(s),clear:(e,r)=>{S.text(""),r("")},history:(e,r)=>r(u.map((e,r)=>(r+1).toString().padStart(5)+`	`+e).join(`
`)),cat:(e,r)=>{e=e[0];if(!e||!L[e])return r("hmmm, not sure what you lookin for...");$.get(L[e],r)},ls:(e,r)=>{var t=/^-[a-z]*l[a-z]*/;e[0]&&t.test(e[0])?e[0]&&t.test(e[0])&&r(b):r('access.log  error.log  snipe.log  <span class="ex">watch</span>')}},O=()=>{u.push(p.join("")),p=[],i=null,e(),r()};$(document).on("keydown",function(e){if(S.hasClass("active")){switch(e.key){case"Tab":var r=p.join("").trim().split(" ").map(e=>e.trim()).pop().replace(/^\.\//,"");T.forEach(e=>{0===e.indexOf(r)&&(e=e.substring(r.length),S.append(e),p=p.concat(Array.from(e)))});break;case"Enter":var t=p.join("").trim(),n=(t=$(`<span>${t}</span>`).text().split(" ").map(e=>e.trim()))[0],t=t.slice(1);if(S.append(`
`),K[n]&&"function"==typeof K[n]){const s=["ls"];K[n](t,e=>{s.includes(n)?S.append(e):S.append($(`<span>${e}</span>`).text()),O()})}else""!==n&&S.append(`Command '${n}' not found.`),O();break;case"Backspace":p.length&&(S.text(S.text().slice(0,-1)),p.pop());break;case"ArrowUp":0<(i=i||u.length)&&(i--,p=Array.from(u[i]),S.text(`
`+x()+p.join("")));break;case"ArrowDown":i&&i<u.length-1&&(i++,p=Array.from(u[i]),S.text(`
`+x()+p.join("")));break;default:if(e.altKey||e.ctrlKey||e.shiftKey){var o=e;switch(o.key){case"c":case"C":case"d":case"D":case"z":case"Z":o.ctrlKey&&a&&(clearInterval(a),O());break;case"v":case"V":o.ctrlKey&&navigator.clipboard.readText().then(e=>{e&&(S.append(e),p=p.concat(Array.from(e)))});break;default:o.ctrlKey&&o.shiftKey||1===o.key.length&&(S.append(o.key),p.push(o.key))}}else 1===e.key.length&&(S.append(e.key),p.push(e.key))}return A.includes(e.key)?(e.preventDefault(),!1):void 0}}),S.on("click",function(e){S.addClass("active")}),e()});