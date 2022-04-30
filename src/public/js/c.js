$(function(){var a,i,p=[],u=["wtf is going on","how did this console get here?","hopefully i can turn it off..."],r="/var/log/nginx",n=1e3,o=1e3,s="f11snipe",l="nginx",c=[{gid:0,name:"root"}],m=[{gid:o,name:s},{gid:1001,name:"web"}],d="x86_64",h="5.13.0-1022-aws",g="Linux",f="GNU/Linux",v=d,w=d,y=g+` ${l} ${h} #24~20.04.1-Ubuntu SMP Thu Apr 7 22:10:15 UTC 2022 ${v} ${d} ${w} `+f,k=`
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
  `,x=()=>s+`@${l}:${r}# `,A=["/","$","\\","-","*","&","^","#","@"," ","!","(",")","[","]","|","'",'"',"<",">","Tab","ArrowUp","ArrowDown"],S=$("pre#console"),L={"snipe.log":"/logs/snipe.log","error.log":"/logs/error.log","access.log":"/logs/access.log",watch:"/logs/watch.sh"},T=Object.keys(L);function t(){var e=document.getElementById("console");e.scrollTop=e.scrollHeight}function U(e){return $(`<span>${e}</span>`).text()}function e(){S.append(`
`+x())}function j(e){a=setInterval(()=>{$.get(e,e=>{S.text(U(e)),t()})},500)}var C=(e,t)=>{e=e[0]||T[0];a&&clearInterval(a),L[e]&&j(L[e])};function K(e,t){$.get(`/art/${e}.txt?art=curl`,e=>t(U(e)))}var O={id:(e,t)=>t(`uid=${n}(${s}) gid=${o}(${s}) groups=`+m.map(e=>`${e.gid}(${e.name})`).join(",")),cd:(e,t)=>{r=e[0],t("")},uname:(e,t)=>{if(!e[0])return t("Linux");switch(e[0]){case"-a":return t(y);case"-s":return t(g);case"-n":return t(l);case"-r":return t(h);case"-m":return t(v);case"-p":return t(d);case"-i":return t(w);case"-o":return t(f);case"--help":return t(`
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
`):"su"===e[0]?(o=n=0,s="root",m=c,t("")):"-l"===e[0]?t(`
Matching Defaults entries for ubuntu on localhost:
  insults, env_reset, mail_badpass, secure_path=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin

User ubuntu may run the following commands on localhost:
  (ALL : ALL) ALL
  (ALL) NOPASSWD: ALL
`):t(k):t(k)},groups:(e,t)=>t(m.map(e=>e.name).join(" ")),ftw:(e,t)=>K("ftw",t),snipe:(e,t)=>K("ftw",t),f11snipe:(e,t)=>K("ftw",t),lol:(e,t)=>K("lol-70",t),derp:(e,t)=>K("derp-60",t),glhf:(e,t)=>K("glhf",t),pwd:(e,t)=>t(r),ssh:(e,t)=>t("You wish!"),exit:(e,t)=>{"f11snipe"!==s?(o=n=1e3,s="f11snipe",t("")):t("Umm, noooo")},help:(e,t)=>t("NO!"),shit:(e,t)=>t("Watch your language!"),fuck:(e,t)=>t("Watch your language!"),host:(e,t)=>t(l),hostname:(e,t)=>t(l),tail:C,watch:C,"./watch":C,whoami:(e,t)=>t(s),clear:(e,t)=>{S.text(""),t("")},history:(e,t)=>t(u.map((e,t)=>(t+1).toString().padStart(5)+`	`+e).join(`
`)),cat:(e,t)=>{e=e[0];if(!e||!L[e])return t("hmmm, not sure what you lookin for...");$.get(L[e],e=>t(U(e)))},ls:(e,t)=>{var r=/^-[a-z]*l[a-z]*/;e[0]&&r.test(e[0])?e[0]&&r.test(e[0])&&t(b):t('access.log  error.log  snipe.log  <span class="ex">watch</span>')}},E=()=>{u.push(p.join("")),p=[],i=null,e(),t()};$(document).on("keydown",function(e){if(S.hasClass("active")){switch(e.key){case"Tab":var t=p.join("").trim().split(" ").map(e=>e.trim()).pop().replace(/^\.\//,"");T.forEach(e=>{0===e.indexOf(t)&&(e=e.substring(t.length),S.append(e),p=p.concat(Array.from(e)))});break;case"Enter":var r=p.join("").trim(),n=(r=$(`<span>${r}</span>`).text().split(" ").map(e=>e.trim()))[0],r=r.slice(1);if(S.append(`
`),O[n]&&"function"==typeof O[n]){const s=["ls"];O[n](r,e=>{s.includes(n)?S.append(e):S.append($(`<span>${e}</span>`).text()),E()})}else""!==n&&S.append(`Command '${n}' not found.`),E();break;case"Backspace":p.length&&(S.text(S.text().slice(0,-1)),p.pop());break;case"ArrowUp":0<(i=i||u.length)&&(i--,p=Array.from(u[i]),S.text(`
`+x()+p.join("")));break;case"ArrowDown":i&&i<u.length-1&&(i++,p=Array.from(u[i]),S.text(`
`+x()+p.join("")));break;default:if(e.altKey||e.ctrlKey||e.shiftKey){var o=e;switch(o.key){case"c":case"C":case"d":case"D":case"z":case"Z":o.ctrlKey&&a&&(clearInterval(a),E());break;case"v":case"V":o.ctrlKey&&navigator.clipboard.readText().then(e=>{e&&(S.append(e),p=p.concat(Array.from(e)))});break;default:o.ctrlKey&&o.shiftKey||1===o.key.length&&(S.append(o.key),p.push(o.key))}}else 1===e.key.length&&(S.append(e.key),p.push(e.key))}return A.includes(e.key)?(e.preventDefault(),!1):void 0}}),S.on("click",function(e){S.addClass("active")}),e()});