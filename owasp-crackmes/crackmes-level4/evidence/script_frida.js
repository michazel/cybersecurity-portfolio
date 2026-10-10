function hookOpen() {
    const open = Module.getGlobalExportByName("open");

    Interceptor.attach(open, {
        onEnter: function (args) {
            console.log("Open: " + args[0].readCString());
        }
    });
}

function hookSnprintf() {
    let arg = null;
    const snprintf = Module.getGlobalExportByName("snprintf");

    Interceptor.attach(snprintf, {
        onEnter: function (args) {
            arg = args[0];
        },
        onLeave: function (val) {
            if(arg.readCString().indexOf("/status") > -1) {
                arg.writeUtf8String("/fake_status")
            }
            if(arg.readCString().indexOf("/proc/self/fd/43") > -1) {
                arg.writeUtf8String("/proc/self/fd/42")
            }
            console.log("[snprintf] " + arg.readCString());
        }
    });
}

hookOpen()
hookSnprintf()
