import { BaseLayout } from '@/app/layout/base'
// eslint-disable-next-line import/no-internal-modules
import { routes } from '@/shared/routing'
import { Route } from 'atomic-router-react'
import { Error404Page } from './error404'
import { ImagesPage, imagesRoute } from './images'
import { LoginPage, loginRoute } from './login'
import { PreviewPage, previewRoute } from './preview'
import { RegisterPage, registerRoute } from './register'
import { UploadPage, uploadRoute } from './upload'

export const Pages = () => (
  <BaseLayout>
    <Route route={loginRoute} view={LoginPage} />
    <Route route={registerRoute} view={RegisterPage} />
    <Route route={routes.notFound} view={Error404Page} />
    <Route route={uploadRoute} view={UploadPage} />
    <Route route={previewRoute} view={PreviewPage} />
    <Route route={imagesRoute} view={ImagesPage} />
  </BaseLayout>
)
