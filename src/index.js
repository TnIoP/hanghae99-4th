class Site {
    constructor() {
        this.boards = [];
    }

    addBoard(board) {
        for (let i = 0; i < this.boards.length; i++) {
            if (this.boards[i].name === board.name) throw new Error('Already Exist Same BoardName.');
        }
        board.registerCheck = true;
        this.boards.push(board);
    }

    findBoardByName(boardName) {
        for (let i = 0; i < this.boards.length; i++) {
            if (this.boards[i].name === boardName) {
                return this.boards[i];
            }
        }
    }
}

class Board {
    constructor(boardName) {
        this.article = [];
        if (boardName === '' || boardName === null) throw new Error('Invalid BoardName.');
        this.name = boardName;
        this.registerCheck = false;
    }

    publish(article) {
        var date = new Date();

        if (this.registerCheck === false) throw new Error('not register Site.');
        article.id = this.name + '-' + Math.floor(Math.random() * 10);
        article.createdDate = date.toISOString();
        article.registerCheck = true;
        this.article.push(article);
    }

    getAllArticles() {
        return this.article;
    }
}

class Article {
    constructor(jsonPost) {
        this.comment = [];

        if (
            jsonPost.subject === '' ||
            jsonPost.subject === null ||
            jsonPost.content === '' ||
            jsonPost.content === null ||
            jsonPost.author === '' ||
            jsonPost.author === null
        )
            throw new Error('Invalid Input.');

        this.subject = jsonPost.subject;
        this.content = jsonPost.content;
        this.author = jsonPost.author;
        this.registerCheck = false;
        this.id = '';
        this.createdDate = '';
    }

    reply(comment) {
        var date = new Date();

        if (this.registerCheck === false) throw new Error('not register Article.');
        comment.createdDate = date.toISOString();
        this.comment.push(comment);
    }

    getAllComments() {
        return this.comment;
    }
}

class Comment {
    constructor(jsonComment) {
        if (
            jsonComment.content === '' ||
            jsonComment.content === null ||
            jsonComment.author === '' ||
            jsonComment.author === null
        )
            throw new Error('Invalid Input.');
        this.content = jsonComment.content;
        this.author = jsonComment.author;
        this.createdDate = '';
    }
}

module.exports = {
    Site,
    Board,
    Article,
    Comment,
};
