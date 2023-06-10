describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset');
        cy.visit('http://localhost:3000');
        cy.request('POST', 'http://localhost:3003/api/users', { username: 'test', password: 'test' });
        cy.request('POST', 'http://localhost:3003/api/users', { username: 'test2', password: 'test2' });
    });

    it('Login form is shown', function () {
        cy.contains('Log in to application');
    });

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('input:first').type('test');
            cy.get('input:last').type('test');
            cy.contains('Login').click();
            cy.contains('logged in');
        });

        it('fails with wrong credentials', function () {
            cy.get('input:first').type('testtt');
            cy.get('input:last').type('testtt');
            cy.contains('Login').click();
            cy.contains('invalid username');
            cy.get('.notification').should('have.css', 'color', 'rgb(170, 0, 0)');
        });
    });

    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'test', password: 'test' });
        });

        it('A blog can be created', function () {
            cy.contains('New Blog').click();
            cy.get('input[name="Title"]').type('Test blog');
            cy.get('input[name="Author"]').type('Test blog');
            cy.get('input[name="URL"]').type('https://google.com');
            cy.get('[type="submit"]').click();
            cy.contains('New blog');
            cy.contains('added');
            cy.contains('View');
        });

        describe('When blog is created', function () {
            beforeEach(function () {
                cy.createBlog({
                    title: 'How to create a blog',
                    author: 'Some Guy',
                    url: 'https://google.com',
                });
                cy.loginDifferent({ username: 'test2', password: 'test2' });
            });

            it('Users can like a blog', function () {
                cy.get('.view-button').click();
                cy.get('button').contains('like').click();
                cy.contains('likes 1');
            });

            describe('When theres multiple blogs', function () {
                beforeEach(function () {
                    cy.createDifferentBlog({
                        title: 'Different blog',
                        author: 'Other Guy',
                        url: 'https://fullstackopen.com',
                    });
                });

                it('User who created blog can see delete', function () {
                    cy.get('.view-button').eq(0).click();
                    cy.contains('Delete');
                });

                it('User who created blog can delete it', function () {
                    cy.get('.view-button').eq(0).click();
                    cy.contains('test');
                    cy.get('button').contains('Delete').click();
                    cy.contains('How to create a blog').should('not.exist');
                });

                it('Making sure blogs ordered correctly', function () {
                    cy.createBlog({
                        title: 'How to create a blog',
                        author: 'Some Guy',
                        url: 'https://google.com',
                    });
                    cy.get('.view-button').eq(1).click();
                    cy.get('button').contains('like').click();

                    cy.get('.blog').eq(0).should('contain', 'How to create a blog');
                    cy.get('.blog').eq(1).should('contain', 'Different blog');
                });
            });
        });
    });
});
