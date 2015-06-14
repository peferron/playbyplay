/* eslint max-len: 0 */

(function() {
    var runs = [
        {
            input: 'struct Powers { next_value: Option<u32> }\n\nimpl Iterator for Powers {\n    type Item = u32;\n\n    fn next(&mut self) -> Option<u32> {\n        let saved = self.next_value;\n        if let Some(x) = self.next_value {\n            self.next_value = x.checked_mul(2);\n        }\n        saved\n    }\n}\n\nfn powers() -> Powers {\n    Powers { next_value: Some(1) }\n}\n\nfn main() {\n    println!("First 10 powers of 2");\n    for x in powers().take(10) {\n        println!("{}", x);\n    }\n\n    println!("Powers of 2 up to 100");\n    for x in powers() {\n        if x > 100 {\n            break;\n        }\n        println!("{}", x);\n    }\n}',
            output: 'First 10 powers of 2\n1\n2\n4\n8\n16\n32\n64\n128\n256\n512\nPowers of 2 up to 100\n1\n2\n4\n8\n16\n32\n64\n\nProgram ended.',
            status: 'success'
        },
        {
            input: 'fn main() {\n    let a = 0;\n}',
            output: '<anon>:2:9: 2:10 warning: unused variable: `a`, #[warn(unused_variables)] on by default\n<anon>:2     let a = 0;\n                 ^',
            status: 'warning'
        },
        {
            input: 'fn main() {\n    yikes!\n}',
            output: '<anon>:3:1: 3:2 error: expected ident, found `}`\n<anon>:3 }\n         ^\nplaypen: application terminated with error code 101',
            status: 'error'
        }
    ];

    window.playbyplay = {
        load: function(callback) {
            callback(null, runs);
        },
        clear: function(callback) {
            runs = [];
            callback(null);
        }
    };
}());
