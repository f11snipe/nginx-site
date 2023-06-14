$(function(){var a,s,i,l=[],p=["wtf is going on","how did this console get here?","hopefully i can turn it off..."],m="/var/log/nginx",r=1e3,o=1e3,n="f11snipe",u="nginx",c=[{gid:0,name:"root"}],d=[{gid:o,name:n},{gid:1001,name:"web"}],h="x86_64",g="5.13.0-1022-aws",f="Linux",v="GNU/Linux",y=h,w=h,b=f+` ${u} ${g} #24~20.04.1-Ubuntu SMP Thu Apr 7 22:10:15 UTC 2022 ${y} ${h} ${w} `+v,k=`
usage: sudo -h | -K | -k | -V
usage: sudo -v [-AknS] [-g group] [-h host] [-p prompt] [-u user]
usage: sudo -l [-AknS] [-g group] [-h host] [-p prompt] [-U user] [-u user] [command]
usage: sudo [-AbEHknPS] [-r role] [-t type] [-C num] [-g group] [-h host] [-p prompt] [-T timeout] [-u user] [VAR=value] [-i|-s] [<command>]
usage: sudo -e [-AknS] [-r role] [-t type] [-C num] [-g group] [-h host] [-p prompt] [-T timeout] [-u user] file ...
`,x=()=>n+`@${u}:${m}# `,A=["/","$","\\","-","*","&","^","#","@"," ","!","(",")","[","]","|","'",'"',"<",">","Tab","ArrowUp","ArrowDown"],T=$("pre#console"),N={"snipe.log":"/logs/snipe.log","error.log":"/logs/error.log","access.log":"/logs/access.log",watch:"/logs/watch.sh"},L=Object.keys(N),O={bin:{bash:"",cat:"",chgrp:"",chmod:"",chown:"",cp:"",dash:"",date:"",dd:"",df:"",dir:"",dmesg:"",dnsdomainname:"",domainname:"",echo:"",egrep:"",false:"",fgrep:"",findmnt:"",grep:"",gunzip:"",gzexe:"",gzip:"",hostname:"",ln:"",login:"",ls:"",lsblk:"",mkdir:"",mknod:"",mktemp:"",more:"",mount:"",mountpoint:"",mv:"",nisdomainname:"",pidof:"",pwd:"",rbash:"",readlink:"",rm:"",rmdir:"","run-parts":"",sed:"",sh:"",sleep:"",stty:"",su:"",sync:"",tar:"",tempfile:"",touch:"",true:"",umount:"",uname:"",uncompress:"",vdir:"",wdctl:"",ypdomainname:"",zcat:"",zcmp:"",zdiff:"",zegrep:"",zfgrep:"",zforce:"",zgrep:"",zless:"",zmore:"",znew:""},boot:{},dev:{},etc:{hostname:"",nginx:{"nginx.conf":""}},home:{f11snipe:{".bashrc":""}},lib:{},media:{},mnt:{},opt:{},proc:{},root:{".bashrc":"","root.txt":""},sbin:{},srv:{},tmp:{"tmp-1325ab1351ac91":{}},usr:{bin:{},games:{},include:{},lib:{},libexec:{},local:{},sbin:{},share:{},src:{}},var:{backups:{},cache:{},lib:{},local:{},log:{"auth.log":"",btmp:"","dpkg.log":"",faillog:"",lastlog:"",nginx:{"snipe.log":"","error.log":"","access.log":"",watch:""},wtmp:""},mail:{},opt:{},spool:{},tmp:{}}};function S(){var e=document.getElementById("console");e.scrollTop=e.scrollHeight}function e(){T.append(document.createTextNode(`
`+x()))}function j(e){a=setInterval(()=>{$.get(e,e=>{var t;i&&""!==i.trim()?e.length>i.length&&(t=e.substring(i.length),T.append(document.createTextNode(t))):T.append(document.createTextNode(e)),i=e,S()})},500)}var t=(e,t)=>{e=e[0]||L[0];a&&clearInterval(a),N[e]&&j(N[e])};function z(e,t){$.get(`/art/${e}.txt?art=curl`,t)}function E(e,t){var r=O,o=O,n=m.split("/").filter(e=>e),a=e;"/"===(a=a.replace(/\/+/g,"/"))[0]&&(n=[]),a.split("/").filter(e=>e).forEach(e=>{".."===e?n.pop():n.push(e)});for(var s=0;s<n.length;s++){var o=r,i=r[n[s]];if(void 0===i)return t(`'${a}': No such file or directory`);r=i}e=n.join("/");t(null,e="/"!==e[0]?"/"+e:e,r,o,n[n.length-1])}var U={id:(e,t)=>t(`uid=${r}(${n}) gid=${o}(${n}) groups=`+d.map(e=>`${e.gid}(${e.name})`).join(",")),cd:(e,o)=>{e[0]?E(e[0],(e,t,r)=>{e?o("bash: cd: "+e):"string"==typeof r?o(`bash: cd: '${t}': Not a directory`):(m=t,o(""))}):o("")},flag:(e,t)=>{t("Awww, ok ... F11[chattrcleanup]")},uname:(e,t)=>{if(!e[0])return t("Linux");switch(e[0]){case"-a":return t(b);case"-s":return t(f);case"-n":return t(u);case"-r":return t(g);case"-m":return t(y);case"-p":return t(h);case"-i":return t(w);case"-o":return t(v);case"--help":return t(`
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
`):"su"===e[0]?(o=r=0,n="root",d=c,t("")):"-l"===e[0]?t(`
Matching Defaults entries for ubuntu on localhost:
  insults, env_reset, mail_badpass, secure_path=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin

User ubuntu may run the following commands on localhost:
  (ALL : ALL) ALL
  (ALL) NOPASSWD: ALL
`):t(k):t(k)},groups:(e,t)=>t(d.map(e=>e.name).join(" ")),ftw:(e,t)=>z("ftw",t),snipe:(e,t)=>z("ftw",t),f11snipe:(e,t)=>z("ftw",t),lol:(e,t)=>z("lol-70",t),derp:(e,t)=>z("derp-60",t),glhf:(e,t)=>z("glhf",t),pwd:(e,t)=>t(m),ssh:(e,t)=>t("You wish!"),exit:(e,t)=>{"f11snipe"!==n?(o=r=1e3,n="f11snipe",t("")):t("Umm, noooo")},help:(e,t)=>t("NO!"),shit:(e,t)=>t("Watch your language!"),fuck:(e,t)=>t("Watch your language!"),host:(e,t)=>t(u),hostname:(e,t)=>t(u),tail:t,watch:t,"./watch":t,whoami:(e,t)=>t(n),clear:(e,t)=>{T.text(""),t("")},history:(e,t)=>t(p.map((e,t)=>(t+1).toString().padStart(5)+`	`+e).join(`
`)),cat:(e,t)=>{e=e[0];if(!e||!N[e])return t("hmmm, not sure what you lookin for...");$.get(N[e],t)},ls:(e,o)=>{var t=/^-[a-z]*l[a-z]*/,r=e.filter(e=>"-"!==e[0])[0]||m,n=0<e.filter(e=>t.test(e)).length;E(r,(e,t,r)=>{e?o("ls: cannot access "+e):(e=Object.keys(r).map(e=>(fsVal=r[e],n?"object"==typeof fsVal?"drwxr-xr-x   1 root root 4096 Feb  2 00:00 "+e:"-rwxr-xr-x   1 root root 1234 Feb  2 00:00 "+e:e)),o(e.join(`
`)))})},rm:(e,a)=>{var t=e.filter(e=>"-"!==e[0])[0];return t?e.filter(e=>"--help"===e).length?a(`
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
`):void E(t,(e,t,r,o,n)=>{e?a("rm: cannot remove "+e):(delete o[n],a(""))}):a(`rm: missing operand
Try 'rm --help' for more information.`)},mv:(e,t)=>{t("COMING SOON LOL ...")}},I=()=>{p.push(l.join("")),l=[],s=null,e(),S()};$(document).on("keydown",function(e){if(T.hasClass("active")){switch(e.key){case"Tab":var t=l.join("").trim().split(" ").map(e=>e.trim()).pop().replace(/^\.\//,"");L.forEach(e=>{0===e.indexOf(t)&&(e=e.substring(t.length),T.append(document.createTextNode(e)),l=l.concat(Array.from(e)))});break;case"Enter":o=(n=l.join("").trim().split(" ").map(e=>e.trim()))[0],n=n.slice(1),T.append(`
`),a&&i||(U[o]&&"function"==typeof U[o]?U[o](n,e=>{T.append(document.createTextNode(e)),I()}):(""!==o&&T.append(document.createTextNode(`Command '${o}' not found.`)),I()));break;case"Backspace":l.length&&(T.text(T.text().slice(0,-1)),l.pop());break;case"ArrowUp":0<(s=s||p.length)&&(s--,l=Array.from(p[s]),T.text(`
`+x()+l.join("")));break;case"ArrowDown":s&&s<p.length-1&&(s++,l=Array.from(p[s]),T.text(`
`+x()+l.join("")));break;default:if(e.altKey||e.ctrlKey||e.shiftKey){var r=e;switch(r.key){case"c":case"C":case"d":case"D":case"z":case"Z":r.ctrlKey&&(a&&clearInterval(a),i=null,I());break;case"v":case"V":r.ctrlKey&&navigator.clipboard.readText().then(e=>{e&&(T.append(document.createTextNode(e)),l=l.concat(Array.from(e)))});break;default:r.ctrlKey&&r.shiftKey||1===r.key.length&&(T.append(document.createTextNode(r.key)),a&&i||l.push(r.key))}}else 1===e.key.length&&(T.append(document.createTextNode(e.key)),a&&i||l.push(e.key))}var o,n;return A.includes(e.key)?(e.preventDefault(),!1):void 0}}),T.on("click",function(e){T.addClass("active")}),e()});