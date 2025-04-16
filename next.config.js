/* next.config.js */
module.exports = {
    output: 'export',
    images: {
        unoptimized: true
    },
    trailingSlash: true,
    // Add compiler options
    compiler: {
        styledComponents: true,
    },
    typescript: {
        ignoreBuildErrors: false,
    }
};