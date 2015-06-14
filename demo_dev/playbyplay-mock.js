(function() {
    var runs = [
        {
            input: `struct Powers { next_value: Option<u32> }

impl Iterator for Powers {
    type Item = u32;

    fn next(&mut self) -> Option<u32> {
        let saved = self.next_value;
        if let Some(x) = self.next_value {
            self.next_value = x.checked_mul(2);
        }
        saved
    }
}

fn powers() -> Powers {
    Powers { next_value: Some(1) }
}

fn main() {
    println!("First 10 powers of 2");
    for x in powers().take(10) {
        println!("{}", x);
    }

    println!("Powers of 2 up to 100");
    for x in powers() {
        if x > 100 {
            break;
        }
        println!("{}", x);
    }
}`,
            output: `First 10 powers of 2
1
2
4
8
16
32
64
128
256
512
Powers of 2 up to 100
1
2
4
8
16
32
64

Program ended.`,
            status: 'success'
        },
        {
            input: `fn main() {
    let a = 0;
}`,
            output: `<anon>:2:9: 2:10 warning: unused variable: \`a\`, #[warn(unused_variables)] on by default
<anon>:2     let a = 0;
                 ^`,
            status: 'warning'
        },
        {
            input: `fn main() {
    yikes!
}`,
            output: `<anon>:3:1: 3:2 error: expected ident, found \`}\`
<anon>:3 }
         ^
playpen: application terminated with error code 101`,
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
