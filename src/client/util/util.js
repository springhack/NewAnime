import 'babel-polyfill';

let lcs = (a, b) => {
    if (a == '' || b == '')
        return '';
    let f = (new Array(a.length + 1)).fill((new Array(b.length + 1)).fill(0));
    for (let i=1;i<=a.length;++i)
        for (let j=1;j<=b.length;++j)
        {
            if (a[i - 1] == b[j - 1])
                f[i][j] = f[i - 1][j - 1] + 1;
            else
                f[i][j] = Math.max(f[i - 1][j], f[i][j - 1]);
        }
    return f[a.length][b.length];
};

export {lcs};
