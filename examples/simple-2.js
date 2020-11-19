
return {
    main: {
        cols: ["A", "A * 2", "A squared"],
        values: [
            y => ({
                v: y,
                background_color: [(y % 3 == 0) ? 0 : 255, 255, 255]
            }),
            y => y * 2,
            y => y ** 2
        ]
    }
}
