
export const normalizeName = (v) =>   v.replace(/\s+/g, " ").trim(); // fazla boşlukları tek boşluğa indir
export const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).toLowerCase());