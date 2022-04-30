var LS_SIM='access.log  error.log  snipe.log  <span class="ex">watch</span>',LS_ALL=`
total 69
-rw-r----- 1 root root    69 Apr 29 16:22 access.log
-rw-r----- 1 root root    69 Apr 29 16:22 error.log
-rw-r----- 1 root root    69 Apr 29 16:22 snipe.log
-rwxr-xr-x 1 root root   420 Apr 29 17:20 <span class="ex">watch</span>
`;$(function(){var a,s,l=[],i=["wtf is going on","how did this console get here?","hopefully i can turn it off..."],t="/var/log/nginx",n="root",o="nginx",c="x86_64",p="5.13.0-1022-aws",h="Linux",u="GNU/Linux",m=c,g=c,f=h+` ${o} ${p} #24~20.04.1-Ubuntu SMP Thu Apr 7 22:10:15 UTC 2022 ${m} ${c} ${g} `+u,d=()=>n+`@${o}:${t}# `,w=["/","$","\\","-","*","&","^","#","@"," ","!","(",")","[","]","|","Tab","ArrowUp","ArrowDown"],y=$("pre#console"),k={"snipe.log":"/logs/snipe.log","error.log":"/logs/error.log","access.log":"/logs/access.log",watch:"/logs/watch.sh"},v=Object.keys(k);function r(){var e=document.getElementById("console");e.scrollTop=e.scrollHeight}function e(){y.append(`
`+d())}function x(e){a=setInterval(()=>{$.get(e,e=>{y.html(e),r()})},500)}var b=(e,r)=>{e=e[0]||v[0];a&&clearInterval(a),k[e]&&x(k[e])};function A(e,r){$.get(`/art/${e}.txt?art=curl`,r)}var L={id:(e,r)=>r("uid=0(root) gid=0(root) groups=0(root)"),cd:(e,r)=>{t=e[0],r("")},uname:(e,r)=>{if(!e[0])return r("Linux");switch(e[0]){case"-a":return r(f);case"-s":return r(h);case"-n":return r(o);case"-r":return r(p);case"-m":return r(m);case"-p":return r(c);case"-i":return r(g);case"-o":return r(u);case"--help":return r(`
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
`)}},ftw:(e,r)=>A("ftw",r),snipe:(e,r)=>A("ftw",r),f11snipe:(e,r)=>A("ftw",r),lol:(e,r)=>A("lol-70",r),derp:(e,r)=>A("derp-60",r),glhf:(e,r)=>A("glhf",r),pwd:(e,r)=>r(t),ssh:(e,r)=>r("You wish!"),exit:(e,r)=>r("Umm, noooo"),help:(e,r)=>r("NO!"),shit:(e,r)=>r("Watch your language!"),fuck:(e,r)=>r("Watch your language!"),host:(e,r)=>r(o),hostname:(e,r)=>r(o),tail:b,watch:b,"./watch":b,whoami:(e,r)=>r(n),clear:(e,r)=>{y.html(""),r("")},history:(e,r)=>r(i.map((e,r)=>(r+1).toString().padStart(5)+`	`+e).join(`
`)),cat:(e,r)=>{e=e[0];if(!e||!k[e])return r("hmmm, not sure what you lookin for...");$.get(k[e],r)},ls:(e,r)=>{var t=/^-[a-z]*l[a-z]*/,n="none";e[0]&&t.test(e[0])?e[0]&&t.test(e[0])&&(n=LS_ALL):n=LS_SIM,r(n)}},S=()=>{i.push(l.join("")),l=[],s=null,e(),r()};$(document).on("keydown",function(e){if(y.hasClass("active")){switch(e.key){case"Tab":var r=l.join("").trim().split(" ").map(e=>e.trim()).pop().replace(/^\.\//,"");v.forEach(e=>{0===e.indexOf(r)&&(e=e.substring(r.length),y.append(e),l=l.concat(Array.from(e)))});break;case"Enter":n=(o=l.join("").split(" "))[0],o=o.slice(1),y.append(`
`),L[n]&&"function"==typeof L[n]?L[n](o,e=>{y.append(e),S()}):(y.append(`Command '${n}' not found.`),S());break;case"Backspace":l.length&&(y.html(y.html().slice(0,-1)),l.pop());break;case"ArrowUp":0<(s=s||i.length)&&(s--,l=Array.from(i[s]),y.html(`
`+d()+l.join("")));break;case"ArrowDown":s&&s<i.length-1&&(s++,l=Array.from(i[s]),y.html(`
`+d()+l.join("")));break;default:if(e.altKey||e.ctrlKey||e.shiftKey){var t=e;switch(t.key){case"c":case"C":case"d":case"D":case"z":case"Z":t.ctrlKey&&a&&(clearInterval(a),S());break;case"v":case"V":t.ctrlKey&&navigator.clipboard.readText().then(e=>{e&&(y.append(e),l=l.concat(Array.from(e)))});break;default:t.ctrlKey&&t.shiftKey||1===t.key.length&&(y.append(t.key),l.push(t.key))}}else 1===e.key.length&&(y.append(e.key),l.push(e.key))}var n,o;return w.includes(e.key)?(e.preventDefault(),!1):void 0}}),y.on("click",function(e){y.addClass("active")}),e()});