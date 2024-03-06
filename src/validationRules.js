/**
 * @param {string} commitSubject
 */
function hasCorrectType(commitSubject) {
    const conventionalCommitRegex = /^(feat|fix|docs|style|refactor|refactor!|perf|test|build|ci|chore|revert)(\([^\(\)]*\))?: .+/;

    return conventionalCommitRegex.test(commitSubject);
}
exports.hasCorrectType = hasCorrectType;

/**
 * @param {string} commitSubject
 */
function hasNoDotsIntheEnd(commitSubject) {
    const noDotsAtTheEnd = !commitSubject.endsWith('.');
    return noDotsAtTheEnd;
}
exports.hasNoDotsIntheEnd = hasNoDotsIntheEnd;

/**
 * @param {string} commitSubject
 */
function isLeadingLowerCase(commitSubject) {
    const firstLetter = commitSubject[0];
    return firstLetter.toLowerCase() === firstLetter;
}
exports.isLeadingLowerCase = isLeadingLowerCase;

/**
 * @param {string} commitSubject
 */
function firstVerbIsInTheImperativeMood(commitSubject) {
    const secondWord = commitSubject.split(' ')[1];
    const verb = secondWord.replace(/[^a-zA-Z]/g, '');
    const hasWrongEnding = verb.endsWith('ed') || verb.endsWith('ing') || verb.endsWith('s');
    return !hasWrongEnding;
}
exports.firstVerbIsInTheImperativeMood = firstVerbIsInTheImperativeMood;

/**
 * @param {string} commitSubject
 */
function firstVerbIsInLowerCase(commitSubject) {
    const secondWord = commitSubject.split(' ')[1];
    const verb = secondWord.replace(/[^a-zA-Z]/g, '');
    const secondWordStartsWithLowerCase = verb[0].toLowerCase() === verb[0];
    return secondWordStartsWithLowerCase;
}
exports.firstVerbIsInLowerCase = firstVerbIsInLowerCase;

/**
 * @param {string} commitMessage
 */
function getFirstLine(commitMessage) {
    const lines = commitMessage.split('\n');
    return lines[0];
}
exports.getFirstLine = getFirstLine;
