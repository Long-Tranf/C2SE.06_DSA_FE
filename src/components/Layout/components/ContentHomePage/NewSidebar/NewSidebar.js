import './newSidebar.css';

const NewSidebar = () => {
    // Dữ liệu giả cho 5 bài viết
    const posts = [
        {
            title: 'SAP ACADEMIC COMMUNITY CONFERENCE APJ lần đầu tiên diễn ra tại Đại học Duy Tân',
            link: '/post1',
            description:
                '(DSA) – Từ ngày 8 đến 12 tháng 7 năm 2024, tại Đại học Duy Tân – thành phố Đà Nẵng, Cộng đồng học thuật SAP (Systems, Applications, and Products in Data Processing), khu vực châu Á – Thái Bình Dương – Nhật Bản (APJ) 2024 đã tiến hành',
            image: 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg',
            fullPost: true, // Đánh dấu bài viết này là bài viết đầy đủ
        },
        {
            title: 'Bài viết 2: Xu hướng bảo mật thông tin 2024',
            link: '/post2',
            description: '',
            image: '',
            fullPost: false,
        },
        {
            title: 'Bài viết 3: Tương lai của Blockchain',
            link: '/post3',
            description: '',
            image: '',
            fullPost: false,
        },
        {
            title: 'Bài viết 4: Lãnh đạo trong thời đại kỹ thuật số',
            link: '/post4',
            description: '',
            image: '',
            fullPost: false,
        },
        {
            title: 'Bài viết 5: Tầm quan trọng của AI trong doanh nghiệp',
            link: '/post5',
            description: '',
            image: '',
            fullPost: false,
        },
    ];

    return (
        <div className="innerNewSidebar">
            <h4 className="heading">Nguồn Nhân Lực IT</h4>
            {/* Render bài viết đầu tiên đầy đủ thông tin */}
            {posts[0].fullPost && (
                <div className="first-post">
                    <div className="image">
                        <img src={posts[0].image} alt="" />
                    </div>
                    <h5 className="title">{posts[0].title}</h5>
                    <p className="desc">{posts[0].description}</p>
                </div>
            )}
            {/* Render các bài viết còn lại chỉ có tiêu đề */}
            <div className="related-posts">
                {posts.slice(1).map((post, index) => (
                    <div key={index} className="related-post">
                        <a href={post.link} className="related-post-link">
                            {post.title}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewSidebar;
