import { Route } from 'atomic-router-react'
import { BaseLayout } from '@/app/layout/base'
// eslint-disable-next-line import/no-internal-modules
import { routes } from '@/shared/routing'
import { Error404Page } from './error404'
import { LoginPage } from './login'
import { PreviewPage } from './preview'
import { RegisterPage } from './register'
import { UploadPage } from './upload'

export const Pages = () => (
  <BaseLayout>
    <Route route={routes.login} view={LoginPage} />
    <Route route={routes.register} view={RegisterPage} />
    <Route route={routes.notFound} view={Error404Page} />
    <Route route={routes.upload} view={UploadPage} />
    <Route route={routes.preview} view={PreviewPage} />
  </BaseLayout>
)
