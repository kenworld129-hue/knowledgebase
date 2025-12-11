use axum::Router;
// use axum::Server;
use dotenvy::dotenv;
use std::env;
use std::net::SocketAddr;
use tower_http::cors::{Any, CorsLayer};
use axum::http::{Method, HeaderName};

mod db;
mod handlers;
mod models;
mod routes;
mod auth;

#[tokio::main]
async fn main() {
    dotenv().ok();

    let pool = db::create_pool().await;

    let secret = env::var("JWT_SECRET")
        .expect("JWT_SECRET must be set");

    let cors = CorsLayer::new()
        .allow_origin([
            "http://localhost:3000".parse().unwrap(),
            "http://118.27.109.133:3000".parse().unwrap(),
        ])
        .allow_methods([Method::GET, Method::POST, Method::PUT, Method::DELETE, Method::OPTIONS])
        .allow_headers([
            HeaderName::from_static("content-type"),
            HeaderName::from_static("authorization"),
        ])
        .allow_credentials(true);    

    let app = Router::new()
        .nest("/api", routes::incidents::incident_routes(pool.clone(), secret.clone()))
        .nest("/auth", routes::auth::login_routes(pool.clone(), secret))
        .layer(cors);
    
    let addr = SocketAddr::from(([0, 0, 0, 0], 8000));
    println!("Server running at http://{}", addr);

    axum::serve(
        tokio::net::TcpListener::bind(addr).await.unwrap(),
        app,
    )
    .await
    .unwrap();
}
