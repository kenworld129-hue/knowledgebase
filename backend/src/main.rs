use axum::Router;
// use axum::Server;
use dotenvy::dotenv;
use std::env;
use std::net::SocketAddr;
use tower_http::cors::{Any, CorsLayer};

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
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);    

    let app = Router::new()
        .nest("/api", routes::incidents::incident_routes(pool.clone(), secret.clone()))
        .nest("/auth", routes::auth::login_routes(pool.clone(), secret))
        .layer(cors);
    
    let addr = SocketAddr::from(([127, 0, 0, 1], 8000));
    println!("Server running at http://{}", addr);

    axum::serve(
        tokio::net::TcpListener::bind(addr).await.unwrap(),
        app,
    )
    .await
    .unwrap();
}
