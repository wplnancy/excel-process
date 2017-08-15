var xlsx = require('xlsx');
const fs = require('fs');

fs.readFile('./outputFile.json', { encoding: 'utf8', flag: 'r' }, function(err, data) {
    if (err) {
        console.log(error);
    } else {
        var aoa = [];

        var data = JSON.parse(data)
        // console.log(Object.keys(data))
        var keyArray = (Object.keys(data));
        var valusesArray = Object.values(data)


        for (var i = 0; i < keyArray.length; i++) {
            var item = [];
            item.push(keyArray[i]);
            item.push(valusesArray[i]);
            aoa.push(item);
        }


        fs.writeFile('./data.json', JSON.stringify(aoa), 'utf-8', function(err) {
            if (err) {
                console.log("出错了!");
            }
        });

        function s2ab(s) {
            if (typeof ArrayBuffer !== 'undefined') {
                var buf = new ArrayBuffer(s.length);
                var view = new Uint8Array(buf);
                for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                return buf;
            } else {
                var buf = new Array(s.length);
                for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
                return buf;
            }
        }

        function export_table_to_excel(id, type, fn) {
            var wb = xlsx.utils.table_to_book(document.getElementById(id), { sheet: "翻译的文案" });
            var wbout = xlsx.write(wb, { bookType: type, bookSST: true, type: 'binary' });
            var fname = fn || 'test.' + type;
            try {
                saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), fname);
            } catch (e) { if (typeof console != 'undefined') console.log(e, wbout); }
            return wbout;
        }

        function doit(type, fn) { return export_table_to_excel('table', type || 'xlsx', fn); }
    }
});
