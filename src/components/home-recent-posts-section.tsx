"use client";

import {useState} from "react";
import {Link} from "next-view-transitions";

type RecentPost = {
    slug: string;
    title: string;
    excerpt?: string;
};

export function HomeRecentPostsSection({posts}: {posts: RecentPost[]}) {
    const visiblePosts = posts.slice(0, 5);
    const [activeIndex, setActiveIndex] = useState(0);

    if (visiblePosts.length === 0) {
        return null;
    }

    return (
        <section className="home-recent-posts-section" data-home-section>
            <div className="home-container home-recent-posts-layout">
                <div className="home-section-heading home-recent-posts-heading">
                    <span className="home-section-label">Recent Writing</span>
                    <h2>最近文章</h2>
                    <p className="home-section-note">
                        选出最近更新的五篇文章，用更轻一点的方式放在首页，像一组可以翻看的内容卡片。
                    </p>
                </div>

                <div className="home-recent-posts-stage">
                    <div className="home-recent-posts-fan">
                        {visiblePosts.map((post, index) => {
                            const fanOrder = [3, 1, 0, 2, 4];
                            const positions = ["far-left", "left", "center", "right", "far-right"] as const;
                            const activeOrderIndex = fanOrder.indexOf(activeIndex);
                            const currentOrderIndex = fanOrder.indexOf(index);
                            const normalizedIndex = (currentOrderIndex - activeOrderIndex + fanOrder.length) % fanOrder.length;
                            const fanPosition = positions[normalizedIndex] ?? "center";
                            const isActive = fanPosition === "center";

                            return (
                                <article
                                    key={post.slug}
                                    className={`home-recent-post-card home-recent-post-card-${fanPosition}${isActive ? " home-recent-post-card-active" : ""}`}
                                    onClick={() => setActiveIndex(index)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(event) => {
                                        if (event.key === "Enter" || event.key === " ") {
                                            event.preventDefault();
                                            setActiveIndex(index);
                                        }
                                    }}
                                >
                                    <div className="home-recent-post-card-content">
                                        <span className="home-recent-post-card-kicker">Recent / 0{index + 1}</span>
                                        <h3>{post.title}</h3>
                                        <p>{post.excerpt || "继续阅读这篇文章，查看完整内容。"}</p>
                                        <Link
                                            href={`/blog/${post.slug}`}
                                            className="home-recent-post-card-link"
                                            onClick={(event) => event.stopPropagation()}
                                        >
                                            阅读文章
                                        </Link>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
