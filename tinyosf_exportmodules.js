/*
 * tinyosf_exportmodules.js
 *
 * Copyright 2013, Simon Waldherr - http://simon.waldherr.eu/
 * Released under the MIT Licence
 * http://opensource.org/licenses/MIT
 *
 * Github:  https://github.com/shownotes/tinyOSF.js/
 * Version: 0.2.0
 */

/*jslint browser: true, white: true, indent: 2 */
/*global osfBuildTags */

//these functions are only examples, please consider making your own

var osfExportModules = {
  html: function (osfItem, status) {
    "use strict";
    var line, parsed;
    if (status !== undefined) {
      return '';
    }
    if (typeof osfItem.timeSec === 'number') {
      if (osfItem.url !== false) {
        line = '<a data-tooltip="' + osfItem.timeSec + '" title="' + osfItem.timeHMS + ': ' + osfItem.osftext + ' (' + osfBuildTags(osfItem.tags, false, false) + ')" ' + osfBuildTags(osfItem.tags, true, true) + ' href="' + osfItem.url + '">' + osfItem.osftext + '</a>';
      } else {
        line = '<span data-tooltip="' + osfItem.timeSec + '" ' + osfBuildTags(osfItem.tags, true, true) + ' title="' + osfItem.timeHMS + ': ' + osfItem.osftext + ' (' + osfBuildTags(osfItem.tags, false, false) + ')">' + osfItem.osftext + '</span>';
      }
    } else {
      if (osfItem.url !== false) {
        line = '<a' + osfBuildTags(osfItem.tags, true, true) + ' title="' + osfItem.osftext + ' (' + osfBuildTags(osfItem.tags, false, false) + ')" href="' + osfItem.url + '">' + osfItem.osftext + '</a>';
      } else {
        line = '<span' + osfBuildTags(osfItem.tags, true, true) + ' title="' + osfItem.osftext + ' (' + osfBuildTags(osfItem.tags, false, false) + ')">' + osfItem.osftext + '</span>';
      }
    }
    if (osfItem.tags.indexOf('chapter') !== -1) {
      line = '<h2>' + line + ' <small>(' + osfItem.timeHMS + ')</small></h2>';
      parsed = line;
    } else {
      parsed = line + '; ';
    }
    return parsed;
  },
  newhtml: function (osfItem, status) {
    "use strict";
    var line, parsed;
    if (status !== undefined) {
      return '';
    }
    if (typeof osfItem.timeSec === 'number') {
      if (osfItem.url !== false) {
        line = '<a data-tooltip="' + osfItem.timeSec + '" ' + osfBuildTags(osfItem.tags, true, true) + ' href="' + osfItem.url + '">' + osfItem.osftext + '</a>';
      } else {
        line = '<span data-tooltip="' + osfItem.timeSec + '" ' + osfBuildTags(osfItem.tags, true, true) + '>' + osfItem.osftext + '</span>';
      }
    } else {
      if (osfItem.url !== false) {
        line = '<a' + osfBuildTags(osfItem.tags, true, true) + ' href="' + osfItem.url + '">' + osfItem.osftext + '</a>';
      } else {
        line = '<span' + osfBuildTags(osfItem.tags, true, true) + '>' + osfItem.osftext + '</span>';
      }
    }
    if (osfItem.tags.indexOf('chapter') !== -1) {
      line = '<h2>' + line + ' <small>(' + osfItem.timeHMS + ')</small></h2>';
      parsed = line;
    } else {
      parsed = line + '; ';
    }
    return parsed;
  },
  htmllist: function (osfItem, status) {
    "use strict";
    var line, parsed = '', i;
    if (status !== undefined) {
      if (status === 'post') {
        return '</ol>';
      }
      if (status === 'pre') {
        return '';
      }
      return '';
    }
    if (typeof osfItem.timeSec === 'number') {
      if (osfItem.url !== false) {
        line = '<a data-tooltip="' + osfItem.timeSec + '" ' + osfBuildTags(osfItem.tags, true, true) + ' href="' + osfItem.url + '">' + osfItem.osftext + '</a>';
      } else {
        line = '<span data-tooltip="' + osfItem.timeSec + '" ' + osfBuildTags(osfItem.tags, true, true) + '>' + osfItem.osftext + '</span>';
      }
    } else {
      if (osfItem.url !== false) {
        line = '<a' + osfBuildTags(osfItem.tags, true, true) + ' href="' + osfItem.url + '">' + osfItem.osftext + '</a>';
      } else {
        line = '<span' + osfBuildTags(osfItem.tags, true, true) + '>' + osfItem.osftext + '</span>';
      }
    }
    if (osfItem.tags.indexOf('chapter') !== -1) {
      line = '<h2><span>' + osfItem.timeHMS + '</span> ' + line + '</h2>';
      parsed = line;
    } else {
      if (osfItem.iteminfo.afterChapter === 1) {
        parsed += '<ol>';
      }
      if (osfItem.rank.prev < osfItem.rank.curr) {
        for (i = 0; i < (osfItem.rank.curr - osfItem.rank.prev); i += 1) {
          line = '<ol>' + line;
        }
      } else if (osfItem.rank.prev > osfItem.rank.curr) {
        for (i = 0; i < (osfItem.rank.prev - osfItem.rank.curr); i += 1) {
          line = '</ol>' + line;
        }
      }
      parsed += '<li>' + line + '</li>';
      if (osfItem.iteminfo.nextisChapter === true) {
        parsed += '</ol>';
      }
    }
    return parsed;
  },
  markdown: function (osfItem, status) {
    "use strict";
    var line, parsed, rank, i;
    if (status !== undefined) {
      return '';
    }
    if (osfItem.url !== false) {
      line = '[' + osfItem.osftext + '](' + osfItem.url + ')';
    } else {
      line = osfItem.osftext;
    }
    if (osfItem.tags.indexOf('chapter') !== -1) {
      line = '\n#' + line + ' ^' + osfItem.timeHMS + '  \n';
      parsed = line;
    } else {
      rank = '';
      if (osfItem.rank.curr !== 0) {
        for (i = 1; i < osfItem.rank.curr; i += 1) {
          rank += '    ';
        }
        parsed = rank + '*' + ' ' + line;
      } else {
        if (osfItem.rank.prev !== 0) {
          line = '\n' + line;
        }
        parsed = line + '  ';
      }
    }
    return '\n' + parsed;
  },
  chapter: function (osfItem, status) {
    "use strict";
    if (status !== undefined) {
      return '';
    }
    if (osfItem.tags.indexOf('chapter') !== -1) {
      return osfItem.timeHMS + ' ' + osfItem.osftext + '\n';
    }
    return '';
  },
  glossary: function (osfItem, status) {
    "use strict";
    if (status !== undefined) {
      return '';
    }
    if (osfItem.tags.indexOf('glossary') !== -1) {
      return osfItem.timeHMS + ' ' + '<a href="' + osfItem.url + '">' + osfItem.osftext + '</a>' + '\n';
    }
    return '';
  },
  osf: function (osfItem, status) {
    "use strict";
    var line = '';
    if (status !== undefined) {
      return '';
    }
    if (typeof osfItem.timeSec === 'number') {
      line += osfItem.timeHMS + ' ';
    }
    line += osfItem.osftext;
    if (osfItem.url !== false) {
      line += ' <' + osfItem.url + '>';
    }
    if (osfItem.tags.length === 1) {
      line += ' #' + osfItem.tags;
    } else if (osfItem.tags.length > 1) {
      line += osfItem.tags.join(' #');
    }
    return line + '\n';
  },
  anycast: function (osfItem, status) {
    "use strict";
    return osfExportModules.html(osfItem, status);
  },
  source: function (osfItem, status) {
    "use strict";
    return osfExportModules.html(osfItem, status);
  },
  wikigeeks: function (osfItem, status) {
    "use strict";
    return osfExportModules.htmllist(osfItem, status);
  },
  md: function (osfItem, status) {
    "use strict";
    return osfExportModules.markdown(osfItem, status);
  },
  mp4chaps: function (osfItem, status) {
    "use strict";
    return osfExportModules.chapter(osfItem, status);
  }
};
